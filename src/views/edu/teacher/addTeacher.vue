<template>
    <div>
        <el-form :model="teacherForm" label-width="80px" style="width: 90%">
            <el-form-item label="姓名">
                <el-input v-model="teacherForm.name"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="teacherForm.career"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-input v-model="teacherForm.avatar"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="teacherForm.sort"></el-input>
            </el-form-item>
            <el-form-item label="头衔">
                <el-select v-model="teacherForm.level" clearable >
                    <el-option label="首席讲师" :value="0"></el-option>
                    <el-option label="高级讲师" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="teacherForm.intro" :rows="10"></el-input>
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary" @click="addOrEditTeacher()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { addTeacher, getTeacherInfo, editTeacher } from '@/api/edu/teacher/teacher.js'

export default {
    data() {
        return {
            teacherForm: {}
        }
    },

    created() {
        this.init()
    },

    watch: {
        //路由监听，每次路由发生变化都会执行
        $route(to, from) {
            this.init()
        }
    },

    methods: {
        init() {
            //通过判定路径中是否存在id参数来判断是否反显数据
            if(this.$route.params && this.$route.params.id) {
                this.getTeacherInfo(this.$route.params.id)
            } else {
                this.teacherForm = {}
            }
        },
        addOrEditTeacher() {
            if (!this.teacherForm.id) {
                this.addTeacher()
            } else {
                this.editTeacher()
            }
        },
        addTeacher() {
            addTeacher(this.teacherForm).then(response => {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.$router.push({path: "/teacher/table"})
            })
        },
        resetForm() {
            this.teacherForm = {}
        },
        getTeacherInfo(id) {
            getTeacherInfo(id).then(response => {
                this.teacherForm = response.data.item
            })
        },
        editTeacher() {
            editTeacher(this.teacherForm).then(response => {
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                });
                this.$router.push({path: "/teacher/table"})
            })
        }
    }
}
</script>