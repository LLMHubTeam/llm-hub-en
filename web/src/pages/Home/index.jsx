import React, {useContext, useEffect, useRef, useState, useCallback, useMemo, memo} from 'react';
import {Button} from '@douyinfe/semi-ui';
import {API, copy, showError} from '../../helpers';
import {StatusContext} from '../../context/Status';
import {useTranslation} from 'react-i18next';
import {IconCopy, IconPlay, IconTick} from '@douyinfe/semi-icons';
import {Code, Globe, Shield, Zap} from 'lucide-react';
import {Link} from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
    Claude,
    Cline,
    Cursor,
    DeepSeek,
    Dify,
    Doc2X,
    Doubao,
    FastGPT,
    Gemini,
    Gradio,
    Grok,
    Kimi,
    LobeHub,
    N8n,
    OpenAI,
    OpenWebUI,
    Qwen,
    Zhipu
} from '@lobehub/icons';

// 配置常量
const CONFIG = {
    stats: {requests: 1250000, users: 15000, models: 100},
    apiEndpoint: 'https://api.llmhub.com.cn',
    mouseThrottleMs: 16, // ~60fps
};

// 模型与应用图标数据
const MODEL_ICONS = [
    OpenAI,
    Claude.Color,
    Grok,
    Gemini.Color,
    DeepSeek.Color,
    Qwen.Color,
    Doubao.Color,
    Kimi.Color,
    Zhipu.Color
];

const APP_ICONS = [
    LobeHub.Color,
    OpenWebUI,
    Dify.Color,
    FastGPT.Color,
    N8n.Color,
    Gradio.Color,
    Doc2X.Color,
    Cursor,
    Cline
];

// 节流函数
const throttle = (func, wait) => {
    let timeout = null;
    let previous = 0;

    return function (...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
};

// 自定义Hook: Intersection Observer，用于滚动触发动画
const useIntersectionObserver = (options = {threshold: 0.1, rootMargin: '0px 0px -100px 0px'}) => {
    const [ref, setRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        observer.observe(ref);

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, options.threshold, options.rootMargin]);

    return [setRef, isVisible];
};

// 统计卡片组件
const StatCard = memo(({value, label}) => (
    <div className="stat-card" role="group" aria-label={label}>
        <div className="stat-number" aria-live="polite">{value.toLocaleString()}+</div>
        <div className="stat-label">{label}</div>
    </div>
));

StatCard.displayName = 'StatCard';

// 特性卡片组件
const FeatureCard = memo(({icon, title, description}) => (
    <div className="feature-card">
        <div className="feature-icon" aria-hidden="true">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
));

FeatureCard.displayName = 'FeatureCard';

// 用户评价卡片组件
const TestimonialCard = memo(({name, role, content}) => (
    <div className="testimonial-card">
        <p className="testimonial-content">"{content}"</p>
        <div className="testimonial-author">
            <div>
                <div className="author-name">{name}</div>
                <div className="author-role">{role}</div>
            </div>
        </div>
    </div>
));

TestimonialCard.displayName = 'TestimonialCard';

// 模型图标组件
const ModelIcon = memo(({Icon, index}) => (
    <div className="model-icon-wrapper" key={`model-icon-${index}`}>
        <Icon size={48} aria-label={Icon.displayName || `Model ${index + 1}`}/>
    </div>
));

ModelIcon.displayName = 'ModelIcon';

const Home = () => {
    const {t} = useTranslation();
    const [statusState] = useContext(StatusContext);

    // 原有逻辑状态
    const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
    const [homePageContent, setHomePageContent] = useState('');
    const [noticeVisible, setNoticeVisible] = useState(false);

    // 新设计引入的状态
    const [apiEndpoint] = useState(CONFIG.apiEndpoint);
    const [copySuccess, setCopySuccess] = useState(false);
    const heroSectionRef = useRef(null);

    // 用户评价数据
    const testimonials = useMemo(() => [
        {
            name: t('张伟'),
            role: t('AI创业公司CTO'),
            content: t('使用这个网关后，我们的API调用成本降低了60%，稳定性也大幅提升。')
        },
        {
            name: t('徐港'),
            role: t('独立开发者'),
            content: t('集成非常简单，几分钟就完成了迁移，现在可以随意切换不同的AI模型。')
        },
        {
            name: t('黄婕'),
            role: t('产品经理'),
            content: t('统一的API接口让我们的开发效率提升了300%，强烈推荐！')
        },
        {
            name: t('陈金国'),
            role: t('培训机构负责人'),
            content: t('通过AI分析，我们能精准发现每个学生的学习弱项，个性化教学效果显著提升。')
        },
        {
            name: t('李岩'),
            role: t('研究生'),
            content: t('AI帮助我大幅提升了论文写作效率，从文献综述到语言润色都很有帮助。')
        },
        {
            name: t('王伟'),
            role: t('电商平台运营总监'),
            content: t('自从接入这个AI网关，我们的客户服务响应时间缩短了70%，用户满意度大幅提升。')
        }
    ], [t]);

    // 特性数据
    const features = useMemo(() => [
        {
            icon: <Zap size={32}/>,
            title: t('极速响应'),
            description: t('毫秒级延迟，全球CDN加速，确保最佳性能体验')
        },
        {
            icon: <Shield size={32}/>,
            title: t('安全可靠'),
            description: t('企业级安全保障，数据加密传输，100%隐私保护')
        },
        {
            icon: <Code size={32}/>,
            title: t('简单集成'),
            description: t('一行代码接入，兼容OpenAI格式，无需修改现有代码')
        },
        {
            icon: <Globe size={32}/>,
            title: t('全球覆盖'),
            description: t('多节点部署，覆盖全球主要地区，服务稳定不掉线')
        }
    ], [t]);

    // 鼠标跟随视差效果 - 使用节流优化
    useEffect(() => {
        const handleMouseMove = throttle((e) => {
            const hero = heroSectionRef.current;
            if (!hero) return;

            const rect = hero.getBoundingClientRect();
            const xPos = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
            const yPos = ((e.clientY - rect.top) / rect.height - 0.5) * 40;

            hero.querySelectorAll('.hero-bg-element').forEach(el => {
                const speed = parseFloat(el.dataset.speed || 1);
                el.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });
        }, CONFIG.mouseThrottleMs);

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 加载自定义首页或公告
    useEffect(() => {
        const displayHomePageContent = async () => {
            setHomePageContent(localStorage.getItem('home_page_content') || '');
            try {
                const res = await API.get('/api/home_page_content');
                const {success, message, data} = res.data;
                if (success && data) {
                    setHomePageContent(data);
                    localStorage.setItem('home_page_content', data);
                } else if (!success) {
                    showError(message);
                }
            } catch (error) {
                console.error('获取首页内容失败:', error);
            }
            setHomePageContentLoaded(true);
        };

        const checkNoticeAndShow = async () => {
            const lastCloseDate = localStorage.getItem('notice_close_date');
            const today = new Date().toDateString();
            if (lastCloseDate !== today) {
                try {
                    const res = await API.get('/api/notice');
                    if (res.data.success && res.data.data) {
                        setNoticeVisible(true);
                    }
                } catch (error) {
                    console.error('获取公告失败:', error);
                }
            }
        };

        displayHomePageContent();
        checkNoticeAndShow();
    }, []);

    // 复制API端点
    const handleCopy = useCallback(async () => {
        const ok = await copy(apiEndpoint);
        if (ok) {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } else {
            showError(t('复制失败'));
        }
    }, [apiEndpoint, t]);

    // 渲染逻辑: 优先显示后台配置的内容
    if (!homePageContentLoaded) {
        return null;
    }

    if (homePageContent) {
        return (
            <div className="overflow-x-hidden w-full">
                {homePageContent.startsWith('https://') ? (
                    <iframe
                        src={homePageContent}
                        title="home-content"
                        className="w-full h-screen border-none"
                        loading="lazy"
                    />
                ) : (
                    <div className="mt-[60px]" dangerouslySetInnerHTML={{__html: homePageContent}}/>
                )}
            </div>
        );
    }

    // 默认渲染新版视觉主页
    return (
        <div className="w-full overflow-x-hidden">
            <NoticeModal visible={noticeVisible} onClose={() => setNoticeVisible(false)}/>

            {/* Hero Section */}
            <section className="hero-section" ref={heroSectionRef} aria-labelledby="hero-title">
                <div className="hero-bg-element bg-elem-1" data-speed="0.5" aria-hidden="true"></div>
                <div className="hero-bg-element bg-elem-2" data-speed="0.8" aria-hidden="true"></div>
                <div className="hero-bg-element bg-elem-3" data-speed="1.2" aria-hidden="true"></div>

                <div className="hero-content">
                    <h1 id="hero-title" className="main-title">
                        {t('一站式')}<br/>{t('人工智能集成平台')}
                    </h1>
                    <p className="subtitle">{t('集成全球顶尖AI模型，一个API搞定所有需求')}</p>

                    <div className="stats-container">
                        <StatCard value={CONFIG.stats.requests} label={t('API请求处理')}/>
                        <StatCard value={CONFIG.stats.users} label={t('活跃开发者')}/>
                        <StatCard value={CONFIG.stats.models} label={t('AI模型支持')}/>
                    </div>

                    <div className="api-showcase">
                        <div className="api-card">
                            <div className="api-header">
                                <span className="api-label">API Endpoint</span>
                                <div className="status-indicator" role="status">
                                    <div className="status-dot" aria-label="服务在线"></div>
                                    <span>{t('在线服务')}</span>
                                </div>
                            </div>
                            <div className="api-input-container">
                                <input
                                    className="api-input"
                                    value={apiEndpoint}
                                    readOnly
                                    aria-label="API端点地址"
                                />
                                <Button
                                    theme="solid"
                                    type="primary"
                                    className={`copy-button ${copySuccess ? 'copy-button-success' : ''}`}
                                    icon={copySuccess ? <IconTick aria-hidden="true"/> : <IconCopy aria-hidden="true"/>}
                                    onClick={handleCopy}
                                    aria-label={copySuccess ? t('已复制') : t('复制API端点')}
                                    aria-live="polite"
                                >
                                    {copySuccess ? t('已复制') : t('复制')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="cta-container">
                        <Link to="/console">
                            <Button
                                className="btn-primary"
                                theme="solid"
                                type="primary"
                                icon={<IconPlay aria-hidden="true"/>}
                                aria-label={t('获取密钥')}
                            >
                                {t('获取密钥')}
                            </Button>
                        </Link>
                    </div>

                    <div className="models-showcase">
                        <p className="models-title">
                            {t('探索 GPT-5、Claude Opus 4.1、Grok 4、Gemini 2.5 Pro 等全球顶尖大模型')}
                        </p>
                        <div className="models-grid" role="list" aria-label={t('支持的AI模型')}>
                            {MODEL_ICONS.map((Icon, index) => (
                                <ModelIcon key={`model-${index}`} Icon={Icon} index={index}/>
                            ))}
                        </div>
                    </div>

                    <div className="models-showcase">
                        <p className="models-title">
                            {t('一键接入，更低成本，更高稳定性，更简单集成')}
                        </p>
                        <div className="models-grid" role="list" aria-label={t('支持的应用平台')}>
                            {APP_ICONS.map((Icon, index) => (
                                <ModelIcon key={`app-${index}`} Icon={Icon} index={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section fade-in-section is-visible" aria-labelledby="features-title">
                <div className="section-header">
                    <h2 id="features-title" className="section-title">{t('为什么选择我们？')}</h2>
                    <p className="section-subtitle">{t('专业、可靠、高效的AI API网关服务')}</p>
                </div>
                <div className="features-grid" role="list">
                    {features.map((feature, index) => (
                        <FeatureCard key={`feature-${index}`} {...feature} />
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section fade-in-section is-visible" aria-labelledby="testimonials-title">
                <div className="section-header">
                    <h2 id="testimonials-title" className="section-title">{t('用户好评如潮')}</h2>
                    <p className="section-subtitle">{t('看看其他用户怎么说')}</p>
                </div>
                <div className="testimonials-grid" role="list">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={`testimonial-${index}`} {...testimonial} />
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="final-cta-section fade-in-section is-visible" aria-labelledby="final-cta-title">
                <div className="final-cta-content">
                    <h2 id="final-cta-title" className="final-cta-title">{t('准备好开始了吗？')}</h2>
                    <p className="final-cta-subtitle">{t('加入数万名开发者，体验最专业的AI API网关服务')}</p>
                    <Link to="/console">
                        <Button
                            className="btn-primary btn-white"
                            icon={<IconPlay aria-hidden="true"/>}
                            aria-label={t('免费注册账户')}
                        >
                            {t('免费注册账户')}
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;