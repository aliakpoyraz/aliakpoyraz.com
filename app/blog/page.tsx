import { getBlogPosts } from '@/lib/mdx';
import BlogList from '@/components/blog/BlogList'; // <-- Yeni bileşeni çağırıyoruz

export const metadata = {
    title: 'Blog | Ali Akpoyraz',
    description: 'Teknik notlarım ve düşüncelerim.',
};

export default function BlogPage() {
    // Server tarafında veriyi çekiyoruz (SEO için önemli)
    const posts = getBlogPosts();

    // Veriyi Client Component'e gönderiyoruz (Arama çalışsın diye)
    return <BlogList posts={posts} />;
}