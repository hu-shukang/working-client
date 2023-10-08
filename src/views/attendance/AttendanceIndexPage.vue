<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">ホーム</el-breadcrumb-item>
    <el-breadcrumb-item>勤務表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>勤務表一覧</span>
        <el-button type="primary" :icon="Plus" @click="addDialogVisible = true">
          新規追加
        </el-button>
      </div>
    </template>
    <div v-loading="loading">
      <el-table v-if="list.length !== 0" :data="list" border>
        <el-table-column type="index" width="40" align="center" />
        <el-table-column prop="date" label="年月" width="180" />
        <el-table-column prop="reportDate" label="提出日時" width="180">
          <template #default="scope">
            {{
              scope.row.reportDate
                ? dateUtil.format(
                    scope.row.reportDate,
                    Const.FORMAT_YYYY_MM_DD_HH_mm,
                  )
                : '未提出'
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="approvalEmployeeName"
          label="承認者名"
          width="110"
        />
        <el-table-column prop="approvalDate" label="承認日時" width="180">
          <template #default="scope">
            {{
              scope.row.approvalDate
                ? dateUtil.format(
                    scope.row.approvalDate,
                    Const.FORMAT_YYYY_MM_DD_HH_mm,
                  )
                : '未承認'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="備考" />
        <el-table-column label="操作" width="100" align="center">
          <template #default="scope">
            <el-button
              link
              type="warning"
              size="small"
              @click="edit(scope.row)"
            >
              編集
            </el-button>
            <el-button link type="danger" size="small"> 削除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else :image-size="200" description="勤務表は未登録です" />
    </div>
  </el-card>
  <el-dialog v-model="addDialogVisible" title="ご確認">
    <el-form
      ref="yearMonthFormRef"
      :model="yearMonthForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="年月" prop="yearMonth">
        <el-input v-model="yearMonthForm.yearMonth" placeholder="例: 2023-01" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取り消し</el-button>
        <el-button type="primary" @click="addHandler"> 作成 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import { onMounted, reactive, ref } from 'vue';
import { AttendanceReportModel } from '@/models';
import { Plus } from '@element-plus/icons-vue';
import { Const, PATTERN, TRIGGERS, dateUtil } from '@/utils';
import { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';

const { get, loading } = useHttp();
const list = ref<AttendanceReportModel[]>([]);
const addDialogVisible = ref(false);
const router = useRouter();
const yearMonthFormRef = ref<FormInstance>();
const yearMonthForm = reactive({
  yearMonth: '',
});
const rules: FormRules<any> = {
  yearMonth: [
    { required: true, message: '年月は必須です', trigger: TRIGGERS.SUBMIT },
    {
      pattern: PATTERN.YYYY_MM,
      message: '年月は不正です',
      trigger: TRIGGERS.SUBMIT,
    },
  ],
};
const request = async () => {
  const result = await get<AttendanceReportModel[]>('/attendance', {
    withGlobalLoading: false,
  });
  list.value = result.data;
};

const addHandler = async () => {
  await yearMonthFormRef.value!.validate(async (valid, _fields) => {
    if (valid) {
      router.replace(`attendance/${yearMonthForm.yearMonth}/add`);
    }
  });
};

const edit = (model: AttendanceReportModel) => {
  router.push(`attendance/${model.date}/add`);
};

onMounted(async () => {
  await request();
});
</script>
