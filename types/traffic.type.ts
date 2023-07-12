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
  roundTrip?: number;
  /** 定期券(1ヶ月) */
  monthTrainPass?: number;
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
  monthTrainPass?: number;
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
    roundTrip: model.roundTrip!,
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

// test data
export const initTrafficRowModelList = (): TrafficRowModel[] => {
  return [
    {
      checked: false,
      id: stringUtil.uuid(),
      index: 0,
      startStation: '平井',
      transitStation: ['秋葉原'],
      endStation: '有楽町',
      roundTrip: 356,
      monthTrainPass: 5620,
      comment: '東京海上日動出勤'
    },
    {
      checked: false,
      id: stringUtil.uuid(),
      index: 1,
      startStation: '平井',
      transitStation: ['秋葉原'],
      endStation: '五反田',
      roundTrip: 636,
      comment: '帰社'
    },
    {
      checked: false,
      id: stringUtil.uuid(),
      index: 2,
      startStation: '平井',
      endStation: '錦糸町',
      roundTrip: 334,
      monthTrainPass: 5280,
      comment: 'AIG出勤'
    },
    {
      checked: false,
      id: stringUtil.uuid(),
      index: 3,
      startStation: '扇大橋',
      transitStation: ['西日暮里', '新宿'],
      endStation: '聖蹟桜ヶ丘',
      roundTrip: 1528,
      monthTrainPass: 28630,
      comment: 'MS&AD出勤'
    }
  ];
};
