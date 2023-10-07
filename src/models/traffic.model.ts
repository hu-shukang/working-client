import { TRIGGERS } from '@/utils';
import { FormRules } from 'element-plus';

export type TrafficItemModel = {
  /** ルートID */
  routeId: string;
  /** ソート用 */
  sort: string;
} & TrafficAddUpdateForm;

/**
 * 経由ルート追加更新Form
 */
export type TrafficAddUpdateForm = {
  /** 出発駅 */
  startStation: string;
  /** 到着駅 */
  endStation: string;
  /** 経由駅 */
  tractStation?: string[];
  /** 往復実費 */
  roundTrip?: number;
  /** 定期券 */
  monthTrainPass?: number;
  /** 備考 */
  comment?: string;
};

export const trafficFormRules: FormRules<TrafficAddUpdateForm> = {
  startStation: [
    { required: true, message: '出発駅は必須です', trigger: TRIGGERS.SUBMIT },
    { max: 20, message: '20文字以下', trigger: TRIGGERS.SUBMIT },
  ],
  endStation: [
    { required: true, message: '到着駅は必須です', trigger: TRIGGERS.SUBMIT },
    { max: 20, message: '20文字以下', trigger: TRIGGERS.SUBMIT },
  ],
  roundTrip: [
    {
      type: 'integer',
      message: '往復実費は数値です',
      trigger: TRIGGERS.SUBMIT,
    },
    { min: 0, message: '往復実費は0以上です', trigger: TRIGGERS.SUBMIT },
  ],
  monthTrainPass: [
    { type: 'integer', message: '定期券は数値です', trigger: TRIGGERS.SUBMIT },
    { min: 0, message: '定期券は0以上です', trigger: TRIGGERS.SUBMIT },
  ],
  comment: [{ max: 100, message: '100文字以下です', trigger: TRIGGERS.SUBMIT }],
};
