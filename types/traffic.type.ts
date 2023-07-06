export type Station = {
  key: number;
  name: string;
};

export type TrafficAddModel = {
  /** 始発駅 */
  startStation: string;
  /** 経由駅 */
  transitStation?: Station[];
  /** 到着駅 */
  endStation: string;
  /** 往復実費 */
  roundTrip: number;
  /** 定期券(1ヶ月) */
  monthTrainPass: number;
  /** コメント */
  comment: string;
};

export type TrafficEditModel = {
  /** index */
  index: number;
  /** id */
  id: string;
} & TrafficAddModel;

export type TrafficInfo = {
  /** index */
  index: number;
  /** id */
  id: string;
  /** 始発駅 */
  startStation: string;
  /** 経由駅 */
  transitStation?: string[];
  /** 到着駅 */
  endStation: string;
  /** 往復実費 */
  roundTrip: number;
  /** 定期券(1ヶ月) */
  monthTrainPass: number;
  /** コメント */
  comment: string;
};

export type TrafficRowModel = {
  checked: boolean;
} & TrafficInfo;

export const initTrafficAddModel = (): TrafficAddModel => {
  return {
    startStation: '',
    endStation: '',
    roundTrip: 0,
    monthTrainPass: 0,
    comment: ''
  };
};

export const trafficAddModelToTrafficRowModel = (index: number, model: TrafficAddModel): TrafficRowModel => {
  return {
    checked: false,
    index: index,
    id: stringUtil.uuid(),
    startStation: model.startStation,
    endStation: model.endStation,
    transitStation: model.transitStation
      ? model.transitStation.filter((t) => stringUtil.notBlank(t.name)).map((t) => t.name)
      : undefined,
    roundTrip: model.roundTrip,
    monthTrainPass: model.monthTrainPass,
    comment: model.comment
  };
};

export const trafficRowModelToTrafficEditModel = (model: TrafficRowModel): TrafficEditModel => {
  return {
    index: model.index,
    id: model.id,
    startStation: model.startStation,
    endStation: model.endStation,
    transitStation:
      model.transitStation === undefined ? undefined : model.transitStation.map((s, i) => ({ key: i, name: s })),
    roundTrip: model.roundTrip,
    monthTrainPass: model.monthTrainPass,
    comment: model.comment
  };
};
