import React from 'react';
import { Card, Tabs, TabPane } from '@douyinfe/semi-ui';
import { PieChart } from 'lucide-react';
import { VChart } from '@visactor/react-vchart';

const ChartsPanel = ({
  activeChartTab,
  setActiveChartTab,
  spec_line,
  spec_model_line,
  spec_pie,
  spec_rank_bar,
  CARD_PROPS,
  CHART_CONFIG,
  FLEX_CENTER_GAP2,
  hasApiInfoPanel,
  t,
}) => {
  return (
    <Card
      {...CARD_PROPS}
      className={`modern-card shadow-medium ${hasApiInfoPanel ? 'lg:col-span-3' : ''}`}
      title={
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-3'>
          <div className={`${FLEX_CENTER_GAP2} font-semibold text-base`}>
            <PieChart size={20} className='text-semi-color-primary' />
            {t('模型数据分析')}
          </div>
          <Tabs
            type='button'
            activeKey={activeChartTab}
            onChange={setActiveChartTab}
            className='modern-tabs'
          >
            <TabPane tab={<span className='px-2'>{t('消耗分布')}</span>} itemKey='1' />
            <TabPane tab={<span className='px-2'>{t('消耗趋势')}</span>} itemKey='2' />
            <TabPane tab={<span className='px-2'>{t('调用次数分布')}</span>} itemKey='3' />
            <TabPane tab={<span className='px-2'>{t('调用次数排行')}</span>} itemKey='4' />
          </Tabs>
        </div>
      }
      bodyStyle={{ padding: '20px' }}
    >
      <div className='modern-chart-container h-96'>
        {activeChartTab === '1' && (
          <VChart spec={spec_line} option={CHART_CONFIG} />
        )}
        {activeChartTab === '2' && (
          <VChart spec={spec_model_line} option={CHART_CONFIG} />
        )}
        {activeChartTab === '3' && (
          <VChart spec={spec_pie} option={CHART_CONFIG} />
        )}
        {activeChartTab === '4' && (
          <VChart spec={spec_rank_bar} option={CHART_CONFIG} />
        )}
      </div>
    </Card>
  );
};

export default ChartsPanel;
