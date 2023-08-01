/** 組織レベル */
export enum Level {
  /** ルート */
  RT = '000',
  /** 本部 */
  HD = '100',
  /** 部 */
  DP = '200',
  /** 支店 */
  BR = '300',
  /** チーム */
  TE = '400',
  /** サブチーム */
  ST = '500',
  /** ユニット */
  UN = '600'
}

/** 役職 */
export enum Director {
  /** 社長 */
  PRESIDENT = '000',
  /** 本部長 */
  GENERAL_MANAGER = '100',
  /** 部長 */
  MANAGER = '200',
  /** 副部長 */
  SUB_MANAGER = '300',
  /** 支店長 */
  BRANCH_MANAGER = '400',
  /** 部長代理 */
  DEPUTY_MANAGER = '500',
  /** チームリーダー */
  TEAM_LEADER = '600',
  /** サブリーダー */
  SUB_LEADER = '700',
  /** ユニットリーダー */
  UNIT_LEADER = '800',
  /** 一般社員 */
  MEMBER = '900'
}

/** 部門・チーム */
export type DepartmentInfo = {
  /** uuid */
  id: string;
  /** 部門コード */
  departmentCode: string;
  /** レベル */
  level: Level;
  /** 部門名・チーム名 */
  departmentName: string;
};

/** 部門・チーム */
export type Department = {
  /** サブ部門idリスト */
  children: string[];
} & DepartmentInfo;

export type DepartmentEmployee = {
  /** 社員ID */
  id: string;
  /** 役職 */
  director: string;
  /** 苗字 */
  lastName: string;
  /** 名前 */
  firstName: string;
};

/** 部門・社員のTreeView */
export type DepartmentNode = {
  employees?: DepartmentEmployee[];
  children?: DepartmentNode[];
  open: boolean;
} & DepartmentInfo;

// test data
export const initDepartmentTree = (): DepartmentNode => {
  return {
    id: stringUtil.uuid(),
    departmentCode: '0000',
    level: Level.RT,
    departmentName: 'ビートテック',
    open: true,
    children: [
      {
        id: stringUtil.uuid(),
        departmentCode: '0010',
        level: Level.HD,
        departmentName: '経営企画室',
        open: false
      },
      {
        id: stringUtil.uuid(),
        departmentCode: '1010',
        level: Level.HD,
        departmentName: '営業本部',
        open: false,
        employees: [
          {
            id: '123456',
            director: Director.GENERAL_MANAGER,
            lastName: '緒方',
            firstName: '淳'
          }
        ],
        children: [
          {
            id: stringUtil.uuid(),
            departmentCode: '1010',
            level: Level.DP,
            departmentName: '営業部',
            open: false,
            employees: [
              {
                id: '23456',
                director: Director.DEPUTY_MANAGER,
                lastName: '梅谷',
                firstName: '直浩'
              },
              {
                id: '13456',
                director: Director.SUB_MANAGER,
                lastName: '工藤',
                firstName: '朗'
              }
            ]
          },
          {
            id: stringUtil.uuid(),
            departmentCode: '1012',
            level: Level.DP,
            departmentName: 'エンジニアリンググループ',
            open: false,
            employees: [
              {
                id: '23436',
                director: Director.DEPUTY_MANAGER,
                lastName: '衣笠',
                firstName: '敦之'
              }
            ]
          },
          {
            id: stringUtil.uuid(),
            departmentCode: '2010',
            level: Level.BR,
            departmentName: '大阪支店',
            open: false,
            employees: [
              {
                id: '23456',
                director: Director.BRANCH_MANAGER,
                lastName: '山口',
                firstName: '孝'
              }
            ]
          }
        ]
      },
      {
        id: stringUtil.uuid(),
        departmentCode: '1020',
        level: Level.HD,
        departmentName: '技術本部',
        open: false,
        employees: [
          {
            id: '23456',
            director: Director.GENERAL_MANAGER,
            lastName: '黒川',
            firstName: '岳'
          }
        ],
        children: [
          {
            id: stringUtil.uuid(),
            departmentCode: '1021',
            level: Level.DP,
            departmentName: 'ITSセクション',
            open: false,
            children: [
              {
                id: stringUtil.uuid(),
                departmentCode: '1021',
                level: Level.TE,
                departmentName: '渡邊チーム',
                open: false
              }
            ]
          }
        ]
      }
    ]
  };
};
