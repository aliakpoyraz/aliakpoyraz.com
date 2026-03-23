import { config, fields, collection } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components';

export default config({
  storage: {
    kind: (
      process.env.NODE_ENV === 'development' ||
      !process.env.NEXT_PUBLIC_VERCEL_ENV
    ) ? 'local' : 'github',
    repo: {
      owner: 'aliakpoyraz',
      name: 'aliakpoyraz.com',
    },
  },
  collections: {
    blogs: collection({
      label: 'Blogs',
      slugField: 'title',
      path: 'content/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blogs',
              publicPath: '/images/blogs/',
            },
          },
          components: {
            Callout: wrapper({
              label: 'Callout',
              schema: {
                type: fields.select({
                  label: 'Type',
                  options: [
                    { label: 'Info', value: 'info' },
                    { label: 'Success', value: 'success' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Danger', value: 'danger' },
                  ],
                  defaultValue: 'info',
                }),
                title: fields.text({ label: 'Title' }),
              },
            }),
            YouTubeCard: block({
              label: 'YouTube Card',
              schema: {
                url: fields.url({
                  label: 'YouTube URL',
                  validation: { isRequired: true },
                }),
              },
            }),
            ProsCons: block({
              label: 'Pros & Cons',
              schema: {
                title: fields.text({ label: 'Title' }),
                pros: fields.array(fields.text({ label: 'Pro' }), {
                  label: 'Pros',
                  itemLabel: props => props.value,
                }),
                cons: fields.array(fields.text({ label: 'Con' }), {
                  label: 'Cons',
                  itemLabel: props => props.value,
                }),
              },
            }),
            CaptionImage: block({
              label: 'Caption Image',
              schema: {
                src: fields.text({
                  label: 'Image Source (URL or Path)',
                  validation: { isRequired: true },
                }),
                alt: fields.text({
                  label: 'Alt Text',
                  validation: { isRequired: true },
                }),
                caption: fields.text({ label: 'Caption' }),
              },
            }),
            Accordion: wrapper({
              label: 'Accordion',
              schema: {
                title: fields.text({
                  label: 'Title',
                  validation: { isRequired: true },
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
