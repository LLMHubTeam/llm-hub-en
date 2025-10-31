import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@douyinfe/semi-ui';
import {getFavicon, getFooterHTML, getSystemName} from '../../helpers';
import { StatusContext } from '../../context/Status';

const FooterBar = () => {
    const { t } = useTranslation();
    const [footer, setFooter] = useState(getFooterHTML());
    const systemName = getSystemName();
    const logo = getFavicon();
    const [statusState] = useContext(StatusContext);
    const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;

    const loadFooter = () => {
        let footer_html = localStorage.getItem('footer_html');
        if (footer_html) {
            setFooter(footer_html);
        }
    };

    const currentYear = new Date().getFullYear();

    const customFooter = useMemo(
        () => (
            <footer className='relative h-auto py-12 px-6 md:px-24 w-full flex flex-col items-center justify-between bg-semi-color-bg-1'>
                {isDemoSiteMode ? (
                    // 演示模式页脚
                    <>
                        <div className='flex flex-col md:flex-row justify-between w-full max-w-[1110px] mb-10 gap-8'>
                            <div className='flex-shrink-0'>
                                <img
                                    src={logo}
                                    alt={systemName}
                                    className='w-16 h-16 rounded-full bg-gray-800 p-1.5 object-contain'
                                />
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full'>
                                <div className='text-left'>
                                    <p className='!text-semi-color-text-0 font-semibold mb-5'>
                                        {t('关于我们')}
                                    </p>
                                    <div className='flex flex-col gap-4'>
                                        <a
                                            href='https://docs.newapi.pro/wiki/project-introduction/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            {t('关于项目')}
                                        </a>
                                        <a
                                            href='https://docs.newapi.pro/support/community-interaction/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            {t('联系我们')}
                                        </a>
                                        <a
                                            href='https://docs.newapi.pro/wiki/features-introduction/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            {t('功能特性')}
                                        </a>
                                    </div>
                                </div>

                                <div className='text-left'>
                                    <p className='!text-semi-color-text-0 font-semibold mb-5'>
                                        {t('文档')}
                                    </p>
                                    <div className='flex flex-col gap-4'>
                                        <a
                                            href='https://docs.newapi.pro/getting-started/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            {t('快速开始')}
                                        </a>
                                        <a
                                            href='https://docs.newapi.pro/installation/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            {t('安装指南')}
                                        </a>
                                        <a
                                            href='https://docs.newapi.pro/api/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            {t('API 文档')}
                                        </a>
                                    </div>
                                </div>

                                <div className='text-left'>
                                    <p className='!text-semi-color-text-0 font-semibold mb-5'>
                                        {t('相关项目')}
                                    </p>
                                    <div className='flex flex-col gap-4'>
                                        <a
                                            href='https://github.com/songquanpeng/one-api'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            One API
                                        </a>
                                        <a
                                            href='https://github.com/novicezk/midjourney-proxy'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            Midjourney-Proxy
                                        </a>
                                        <a
                                            href='https://github.com/Calcium-Ion/neko-api-key-tool'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            neko-api-key-tool
                                        </a>
                                    </div>
                                </div>

                                <div className='text-left'>
                                    <p className='!text-semi-color-text-0 font-semibold mb-5'>
                                        {t('友情链接')}
                                    </p>
                                    <div className='flex flex-col gap-4'>
                                        <a
                                            href='https://github.com/Calcium-Ion/new-api-horizon'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            new-api-horizon
                                        </a>
                                        <a
                                            href='https://github.com/coaidev/coai'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            CoAI
                                        </a>
                                        <a
                                            href='https://www.gpt-load.com/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='!text-semi-color-text-1'
                                        >
                                            GPT-Load
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // 非演示模式 - 参考硅基流动样式
                    <div className='w-full max-w-[1200px]'>

                        {/* 多列导航 */}
                        <div className='grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12'>
                            <div>
                                <div className='mb-12 flex flex-col items-center'>
                                    <div className='flex items-center gap-3 mb-4'>
                                        <img
                                            src={logo}
                                            alt={systemName}
                                            className='w-24 h-24 object-contain'
                                        />
                                    </div>
                                    <Typography.Text className='!text-semi-color-text-2 text-center'>
                                        {t('一站式人工智能集成平台')}
                                    </Typography.Text>
                                    {/* 添加GitHub图标链接 */}
                                    <a
                                        href='https://github.com/LLMHubTeam'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='mt-4'
                                    >
                                        <svg
                                            className='w-6 h-6 !text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'
                                            fill='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* 第一列 */}
                            <div>
                                <p className='!text-semi-color-text-0 font-medium mb-4'>{t('页面')}</p>
                                <div className='flex flex-col gap-3'>
                                    <a href='/console' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('控制台')}
                                    </a>
                                    <a href='/pricing' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('模型广场')}
                                    </a>
                                </div>
                            </div>

                            {/* 第二列 - 文档 */}
                            <div>
                                <p className='!text-semi-color-text-0 font-medium mb-4'>{t('产品')}</p>
                                <div className='flex flex-col gap-3'>
                                    <a href='https://docs.llmhub.com.cn/quickstart' target='_blank' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('快速开始')}
                                    </a>
                                    <a href='https://docs.llmhub.com.cn/api-reference' target='_blank' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('API 文档')}
                                    </a>
                                    <a href='https://docs.llmhub.com.cn/develop' target='_blank' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('场景示例')}
                                    </a>
                                </div>
                            </div>

                            {/* 第三列 - 法律 */}
                            <div>
                                <p className='!text-semi-color-text-0 font-medium mb-4'>{t('法律')}</p>
                                <div className='flex flex-col gap-3'>
                                    <a href='https://docs.llmhub.com.cn/terms-and-privacy/terms' target='_blank' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('用户协议')}
                                    </a>
                                    <a href='https://docs.llmhub.com.cn/terms-and-privacy/privacy' target='_blank' className='!text-semi-color-text-1 hover:!text-semi-color-primary transition-colors'>
                                        {t('隐私协议')}
                                    </a>
                                </div>
                            </div>

                            {/* 第四列 - 联系我们 */}
                            <div>
                                <p className='!text-semi-color-text-0 font-medium mb-4'>{t('联系我们')}</p>
                                <div className='flex flex-col gap-3'>
                                    <Typography.Text className='!text-semi-color-text-2 text-sm block'>
                                        {t('业务咨询')}: <a href='mailto:contact@llmhub.com.cn' target="_blank" className='!text-semi-color-primary hover:underline'>contact@llmhub.com.cn</a>
                                    </Typography.Text>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 底部版权和备案信息 */}
                <div className='w-full max-w-[1200px] pt-8 border-t border-semi-color-border'>
                    <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-4'>
                        <Typography.Text className='text-sm !text-semi-color-text-2'>
                            © {currentYear} llmhub.com.cn {t('版权所有')}
                        </Typography.Text>
                        <div className='flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm'>
                            <a
                                href='https://beian.miit.gov.cn'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='!text-semi-color-text-2 hover:!text-semi-color-primary transition-colors'
                            >
                                津ICP备2025029271号-1
                            </a>
                            <a
                                href='https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902004083'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='!text-semi-color-text-2 hover:!text-semi-color-primary transition-colors'
                            >
                                浙公网安备33010902004083号
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        ),
        [logo, systemName, t, currentYear, isDemoSiteMode],
    );

    useEffect(() => {
        loadFooter();
    }, []);

    return (
        <div className='w-full'>
            {footer ? (
                <div className='relative'>
                    <div
                        className='custom-footer'
                        dangerouslySetInnerHTML={{ __html: footer }}
                    ></div>
                    <div className='absolute bottom-2 right-4 text-xs !text-semi-color-text-2 opacity-70'>
                        <span>{t('设计与开发由')} </span>
                        <a
                            href='https://github.com/LLMHubTeam/llm-hub'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='!text-semi-color-primary font-medium'
                        >
                            LLM Hub
                        </a>
                    </div>
                </div>
            ) : (
                customFooter
            )}
        </div>
    );
};

export default FooterBar;