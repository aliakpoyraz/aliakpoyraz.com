import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
    console.error('Error: GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const CONTENT_DIR = path.join(process.cwd(), 'content');

const forceUpdate = process.argv.includes('--force');

/**
 * Bekleme fonksiyonu (Rate limitleri aşmamak için)
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Token tasarrufu için içeriği sadeleştirir.
 */
function preprocessContent(content) {
    if (!content) return '';
    return content
        .replace(/```[\s\S]*?```/g, '') // Kod bloklarını temizle
        .replace(/<[^>]*>?/g, '')      // HTML taglerini temizle
        .replace(/!\[.*?\]\(.*?\)/g, '') // Resimleri temizle
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Linkleri temizle ama metni tut
        .replace(/\n\s*\n/g, '\n')     // Fazla satır başlarını temizle
        .trim();
}

async function generateSummary(title, rawContent) {
    const cleanContent = preprocessContent(rawContent);
    const prompt = `Başlık: ${title}\nİçerik:\n${cleanContent.substring(0, 8000)}`;
    
    // Sistem talimatları
    const systemInstruction = `Sen teknik bir içerik editörüsün. Görevin, karmaşık yazılımları ve teknik konuları saniyeler içinde anlaşılabilecek netlikte özetlemektir.
    KURALLAR:
    - Kesinlikle MAKALENİN DIŞINA ÇIKMA!
    - Giriş cümlesi (Bu yazıda, Makalede vb.) KESİNLİKLE yazma, direkt konuya gir.
    - Her cümle doğrudan bir aksiyon veya önemli bir teknik gerçek içermeli.
    - Maksimum 4 cümle kullan.
    - 4 cümleden az bir şekilde özetleme yapabiliyorsan 4 cümleye tamamlamak zorunda değilsin.
    - Stil: Profesyonel, doğrudan ve teknik.
    - SADECE özeti döndür, ek açıklama yapma.`;

    // Denenecek modeller
    const models = ["gemini-flash-latest", "gemini-1.5-flash-latest", "gemini-2.0-flash"];

    for (const modelName of models) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName, systemInstruction });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();
            if (text) {
                console.log(`✅ Success with model: ${modelName}`);
                return text;
            }
        } catch (error) {
            const errorMsg = error.message || '';
            const isQuotaExceeded = errorMsg.includes('429') || errorMsg.includes('Quota exceeded');
            const isNotFound = errorMsg.includes('not found') || errorMsg.includes('404');
            
            if (isQuotaExceeded) {
                console.warn(`⚠️  ${modelName} rate limitine takıldı, sıradaki model deneniyor...`);
                await sleep(1000); // Kısa bir bekleme
            } else if (isNotFound) {
                console.warn(`⚠️  ${modelName} bu API key ile kullanılamıyor, sıradaki model deneniyor...`);
            } else {
                console.error(`❌ ${modelName} hatası: ${errorMsg.substring(0, 100)}...`);
                break; // Beklenmedik bir hatada dur
            }
        }
    }

    return null;
}

async function processFiles() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.error(`Error: Content directory ${CONTENT_DIR} does not exist.`);
        return;
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));

    for (const file of files) {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        if (!data.summary || forceUpdate) {
            console.log(`${forceUpdate ? 'Re-generating' : 'Generating'} summary for: ${file}...`);
            const summary = await generateSummary(data.title || file, content);
            if (summary) {
                const cleanSummary = summary.replace(/^["']|["']$/g, '').trim();
                data.summary = cleanSummary;
                const updatedFileContent = matter.stringify(content, data);
                fs.writeFileSync(filePath, updatedFileContent);
                console.log(`✅ Summary ${forceUpdate ? 'updated' : 'added'} for ${file}`);
                
                await sleep(3000);
            }
        } else {
            console.log(`Skipping ${file}, summary already exists. Use --force to update.`);
        }
    }
}

processFiles().then(() => {
    console.log('Summarization process completed.');
}).catch(err => {
    console.error('Error:', err);
});
