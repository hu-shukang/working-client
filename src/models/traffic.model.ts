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
