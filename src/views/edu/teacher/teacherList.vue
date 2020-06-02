<template>
    <div>
        <el-table
            :data="teacherList"
            border
            style="width: 100%">
            <el-table-column label="序号" width="50">
                <template slot-scope="scope">
                   {{ (scope.$index + 1) + (page-1)*size}}
                </template>
            </el-table-column> 
            <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
            <el-table-column prop="career" label="职位" width="100"> </el-table-column>
            <el-table-column label="头衔" width="100">
                <template slot-scope="scope">
                    {{ scope.row.level===1 ? "高级讲师" : "首席讲师" }}
                </template>
            </el-table-column>
            <el-table-column prop="avatar" label="头像" width="180"> </el-table-column>
            <el-table-column prop="intro" label="简介" width="180"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="page"
            :page-size="size"
            style="text-align:center"
            @current-change="getTeacherList">
        </el-pagination>
    </div>
</template>

<script>
import {getTeacherList} from '@/api/edu/teacher/teacher.js'

export default {
    data() {
        return {
            teacherList: [],
            page: 1,
            size: 2,
            total: 0,
            queryCondition: {}
        }
    },

    created() {
        this.getTeacherList();
    },

    methods: {
        getTeacherList(page=1) {
            this.page = page
            getTeacherList(this.page, this.size, this.queryCondition)
            .then(response => {
                this.teacherList = response.data.records
                this.total = response.data.total
            })
            .catch(error => {

            })
        }
    }
}
</script>