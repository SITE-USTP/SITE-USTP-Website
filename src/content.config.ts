import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
        author: z.string().default('SITE Officer'),
        tags: z.array(z.string()).default([]),
	}),
});

const officers = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        position: z.string(),
        image: z.string(),
        socials: z.object({
            github: z.string().optional(),
            linkedin: z.string().optional(),
            email: z.string().optional(),
        }).optional(),
        bio: z.string().optional(),
    })
});

const transparency = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        type: z.enum(['Financial', 'Meeting Minutes', 'Official Statement']),
        fileUrl: z.string().optional(), // For PDF downloads if not pure markdown
    })
});

const resources = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        category: z.enum(['Academic', 'Syllabus', 'Guide', 'Software']),
        description: z.string(),
        link: z.string(),
        icon: z.string().optional(), // Icon name or URL
    })
});

export const collections = { blog, officers, transparency, resources };
