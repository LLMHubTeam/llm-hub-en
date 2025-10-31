import React from 'react';
import { Card, Avatar, Skeleton, Tag } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StatsCards = ({
  groupedStatsData,
  loading,
  getTrendSpec,
  CARD_PROPS,
  CHART_CONFIG,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='mb-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {groupedStatsData.map((group, idx) => (
          <Card
            key={idx}
            {...CARD_PROPS}
            className={`stats-card ${group.color} border-0 shadow-medium w-full`}
            title={
              <span className='text-white font-semibold text-base'>
                {group.title}
              </span>
            }
          >
            <div className='space-y-4'>
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className='dashboard-stat-item flex items-center justify-between'
                  onClick={item.onClick}
                >
                  <div className='flex items-center flex-1'>
                    <Avatar
                      className='mr-3 modern-avatar'
                      size='default'
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <div className='flex-1'>
                      <div className='text-xs text-white opacity-80 mb-1'>
                        {item.title}
                      </div>
                      <div className='text-xl font-bold text-white'>
                        <Skeleton
                          loading={loading}
                          active
                          placeholder={
                            <Skeleton.Paragraph
                              active
                              rows={1}
                              style={{
                                width: '80px',
                                height: '28px',
                                marginTop: '4px',
                              }}
                            />
                          }
                        >
                          <span className='animated-stat-number'>
                            {item.value}
                          </span>
                        </Skeleton>
                      </div>
                    </div>
                  </div>
                  {item.title === t('当前余额') ? (
                    <Tag
                      color='white'
                      shape='circle'
                      size='large'
                      className='modern-tag'
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/console/topup');
                      }}
                    >
                      {t('充值')}
                    </Tag>
                  ) : (
                    (loading ||
                      (item.trendData && item.trendData.length > 0)) && (
                      <div className='w-28 h-12 ml-2'>
                        <VChart
                          spec={getTrendSpec(item.trendData, item.trendColor)}
                          option={CHART_CONFIG}
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
