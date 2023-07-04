export type TrafficInfo = {
  /** index */
  index: number;
  /** id */
  id: string;
  /** 経路 */
  route: string[];
  /** 往復実費 */
  roundTrip: number;
  /** 定期券(1ヶ月) */
  monthTrainPass: number;
};

export type TrafficRowModel = {
  checked: boolean;
} & TrafficInfo;
