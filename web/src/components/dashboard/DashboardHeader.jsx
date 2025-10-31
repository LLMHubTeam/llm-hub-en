import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { RefreshCw, Search } from 'lucide-react';

const DashboardHeader = ({
  getGreeting,
  greetingVisible,
  showSearchModal,
  refresh,
  loading,
  t,
}) => {
  return (
    <div className='flex items-center justify-between mb-8 modern-page-header'>
      <div>
        <h1
          className='modern-page-title transition-opacity duration-1000 ease-in-out'
          style={{ opacity: greetingVisible ? 1 : 0 }}
        >
          {getGreeting}
        </h1>
        <p className='modern-page-subtitle mt-2'>
          {t('欢迎回来，查看您的数据统计和系统信息')}
        </p>
      </div>
      <div className='flex gap-3'>
        <Button
          type='tertiary'
          icon={<Search size={18} />}
          onClick={showSearchModal}
          className='modern-icon-button bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white border-0'
        />
        <Button
          type='tertiary'
          icon={<RefreshCw size={18} />}
          onClick={refresh}
          loading={loading}
          className='modern-icon-button bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-0'
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
