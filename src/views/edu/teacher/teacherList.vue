<template>
    <div>
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="queryCondition.name"></el-input>
            </el-form-item>
            <el-form-item label="头衔">
                <el-select v-model="queryCondition.level" clearable >
                    <el-option label="首席讲师" :value="0"></el-option>
                    <el-option label="高级讲师" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="queryCondition.begin" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="queryCondition.end" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getTeacherList()">查询</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
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
            <el-table-column prop="intro" label="简介" width="180"> </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间" width="180"> </el-table-column>
            <el-table-column prop="sort" label="排序" width="50"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link :to="'/teacher/edit/' + scope.row.id">
                        <el-button size="mini" type="primary">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="deleteTeacher(scope.row.id)">删除</el-button>
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
import {getTeacherList, deleteById} from '@/api/edu/teacher/teacher.js'

export default {
    data() {
        return {
            teacherList: [],
            page: 1,
            size: 10,
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
        },
        resetForm(conditon) {
            this.queryCondition = {}
            this.getTeacherList()
        },
        deleteTeacher(id) {
            this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    deleteById(id).then(response => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTeacherList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        }
    }
}
</script>