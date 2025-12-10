import { getBlogPosts } from '@/lib/mdx';
import BlogList from '@/components/blog/BlogList';

export const metadata = {
    title: 'Blog | Ali Akpoyraz',
    description: 'Teknik notlarım ve düşüncelerim.',
};

export default function BlogPage() {
    const posts = getBlogPosts();
    return <BlogList posts={posts} />;
}