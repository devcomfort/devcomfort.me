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
        text: "안녕하세요 devcomfort 입니다. 2013년부터 프로그래밍을 시작하여 현재는 AI 연구와 주식회사 마시는친구들에서 테크리드로서 협업을 하고 있습니다. 프론트엔드, 백엔드, 인프라, AI 등 다양한 분야에 기반 지식을 가지고 있으며, Tabular Learning, 상관/인과추론, 표현학습, 강화학습, 생성모델, 추천모델 등 다양한 개발 및 연구 주제에 큰 관심을 가지고 있습니다. 제가 진행하는 프로젝트는 <a href='https://github.com/devcomfort'>GitHub</a>에서 확인하실 수 있습니다.",
        // image: {
        //     src: '/hero.jpeg',
        //     alt: 'A person sitting at a desk in front of a computer'
        // },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
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
