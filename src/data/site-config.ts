export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: "devcomfort",
    subtitle: "devcomfort의 기술 블로그",
    description: 'devcomfort의 기술 블로그',
    // image: {
    //     src: '/dante-preview.jpg',
    //     alt: 'Dante - Astro.js and Tailwind CSS theme'
    // },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
    ],
    socialLinks: [
        {
            text: 'Email',
            href: 'mailto:im@devcomfort.me/'
        },
    ],
    hero: {
        // title: 'Hi There & Welcome to My Corner of the Web!',
        text: "안녕하세요, devcomfort입니다. 2013년부터 프로그래밍을 시작하여 프론트엔드, 백엔드, 인프라, AI 등 다양한 개발 분야에 깊이 있는 지식을 쌓아왔습니다. 특히 강화학습 기반 PCG, 강화학습 기반 추천 시스템, 상관 분석, 그래프 이론 및 GNN, Quality Diversity, 표현학습, Tabular Learning 등 AI 분야의 다양한 주제에 깊은 관심을 가지고 연구와 개발을 병행하고 있습니다. 현재는 [(주)마시는친구들](https://litt.ly/teut)에서 테크리드로 재직 중이며, 다양한 오픈소스 프로젝트를 [GitHub](https://github.com/devcomfort)에서 공개 및 관리하고 있습니다.",
        // image: {
        //     src: '/hero.jpeg',
        //     alt: 'A person sitting at a desk in front of a computer'
        // },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            },
            {
                text: 'About Me',
                href: '/about'
            }
        ]
    },
    // subscribe: {
    //     title: 'Subscribe to Dante Newsletter',
    //     text: 'One update per week. All the latest posts directly in your inbox.',
    //     formUrl: '#'
    // },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
