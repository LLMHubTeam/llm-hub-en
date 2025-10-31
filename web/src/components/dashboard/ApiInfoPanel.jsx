import React from 'react';
import { Card, Avatar, Tag, Divider, Empty } from '@douyinfe/semi-ui';
import { Server, Gauge, ExternalLink } from 'lucide-react';
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from '@douyinfe/semi-illustrations';
import ScrollableContainer from '../common/ui/ScrollableContainer';

const ApiInfoPanel = ({
  apiInfoData,
  handleCopyUrl,
  handleSpeedTest,
  CARD_PROPS,
  FLEX_CENTER_GAP2,
  ILLUSTRATION_SIZE,
  t,
}) => {
  return (
    <Card
      {...CARD_PROPS}
      className='modern-card shadow-medium bg-gradient-to-br from-semi-color-bg-1 to-semi-color-bg-2'
      title={
        <div className={`${FLEX_CENTER_GAP2} font-semibold text-base`}>
          <Server size={20} className='text-semi-color-primary' />
          {t('API信息')}
        </div>
      }
      bodyStyle={{ padding: '16px' }}
    >
      <ScrollableContainer maxHeight='24rem' className='modern-scrollbar'>
        {apiInfoData.length > 0 ? (
          apiInfoData.map((api, index) => (
            <React.Fragment key={api.id}>
              <div className='modern-list-item info-card'>
                <div className='flex items-start gap-3'>
                  <Avatar
                    size='small'
                    color={api.color}
                    className='modern-avatar flex-shrink-0'
                  >
                    {api.route.substring(0, 2)}
                  </Avatar>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center justify-between mb-2 gap-2'>
                      <span className='text-sm font-semibold !text-semi-color-text-0 break-all'>
                        {api.route}
                      </span>
                      <div className='flex items-center gap-2'>
                        <Tag
                          prefixIcon={<Gauge size={12} />}
                          size='small'
                          color='blue'
                          shape='circle'
                          onClick={() => handleSpeedTest(api.url)}
                          className='modern-tag cursor-pointer'
                        >
                          {t('测速')}
                        </Tag>
                        <Tag
                          prefixIcon={<ExternalLink size={12} />}
                          size='small'
                          color='green'
                          shape='circle'
                          onClick={() =>
                            window.open(api.url, '_blank', 'noopener,noreferrer')
                          }
                          className='modern-tag cursor-pointer'
                        >
                          {t('跳转')}
                        </Tag>
                      </div>
                    </div>
                    <div
                      className='text-sm !text-semi-color-primary break-all cursor-pointer hover:underline mb-2 transition-all'
                      onClick={() => handleCopyUrl(api.url)}
                    >
                      {api.url}
                    </div>
                    <div className='text-sm !text-semi-color-text-2'>
                      {api.description}
                    </div>
                  </div>
                </div>
              </div>
              {index < apiInfoData.length - 1 && <div className='modern-divider my-3' />}
            </React.Fragment>
          ))
        ) : (
          <div className='modern-empty'>
            <div className='modern-empty-icon'>
              <IllustrationConstruction style={ILLUSTRATION_SIZE} />
            </div>
            <div className='modern-empty-text'>
              <div className='font-semibold mb-2'>{t('暂无API信息')}</div>
              <div className='text-sm'>{t('请联系管理员在系统设置中配置API信息')}</div>
            </div>
          </div>
        )}
      </ScrollableContainer>
    </Card>
  );
};

export default ApiInfoPanel;
