export interface Model {
  id: string;
  name: string; // 对应 编号 或 昵称
  handle: string; // 自动生成或手动填
  category: string[]; // Changed to array for multi-select
  location: string; // 省份 + 城市
  image: string;
  video?: string;
  gallery: string[];
  stats: {
    followers: string;
    engagement: string;
    reach: string;
  };
  
  // 基础数据
  age?: string;
  height?: string;
  weight?: string;
  cup?: string;
  measurements?: string;
  
  // 详细资料
  experience?: string; // 经验
  desire?: string; // 欲望大小
  attributes?: {
    tattoo: boolean; // 纹身
    smoking: boolean; // 抽烟
    period: string; // 姨妈时间
  };
  services?: {
    oral: string; // 能否口
    noCondom: string; // 能否无套
    creampie: string; // 能否内射
    sm: string; // 能否SM
  };
  availability?: {
    overnight: boolean; // 能否过夜
    cohabitation: boolean; // 能否同居
    travel: boolean; // 能否外地
    meetingDays: string; // 见面天数
    meetingTime: string; // 见面时间
  };
  pricing?: {
    allowance: string; // 零花预期
    paymentFreq: string; // 支付次数
  };
  limits?: string; // 雷点
  bio: string; // 自我评价
  
  isTrending?: boolean;
  isNew?: boolean;
}