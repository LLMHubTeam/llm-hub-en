import React from 'react';
import PricingTopSection from '../header/PricingTopSection';
import PricingView from './PricingView';

const PricingContent = ({ isMobile, sidebarProps, ...props }) => {
  return (
    <div
      className={isMobile ? 'pricing-content-mobile' : 'pricing-scroll-hide'}
    >
      {/* 页面标题 */}
      {!isMobile && (
        <div className='modern-page-header mb-6'>
          <h1 className='modern-page-title'>{props.t('模型广场')}</h1>
          <p className='modern-page-subtitle mt-2'>
            {props.t('浏览所有可用的AI模型，查看价格和详细信息')}
          </p>
        </div>
      )}

      {/* 固定的顶部区域（分类介绍 + 搜索和操作） */}
      <div className='pricing-search-header'>
        <PricingTopSection
          {...props}
          isMobile={isMobile}
          sidebarProps={sidebarProps}
          showWithRecharge={sidebarProps.showWithRecharge}
          setShowWithRecharge={sidebarProps.setShowWithRecharge}
          currency={sidebarProps.currency}
          setCurrency={sidebarProps.setCurrency}
          showRatio={sidebarProps.showRatio}
          setShowRatio={sidebarProps.setShowRatio}
          viewMode={sidebarProps.viewMode}
          setViewMode={sidebarProps.setViewMode}
          tokenUnit={sidebarProps.tokenUnit}
          setTokenUnit={sidebarProps.setTokenUnit}
        />
      </div>

      {/* 可滚动的内容区域 */}
      <div
        className={
          isMobile ? 'pricing-view-container-mobile' : 'pricing-view-container'
        }
      >
        <PricingView {...props} viewMode={sidebarProps.viewMode} />
      </div>
    </div>
  );
};

export default PricingContent;
