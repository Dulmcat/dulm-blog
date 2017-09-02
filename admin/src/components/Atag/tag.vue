<template>
    <div class="tag">
        <h3>标签</h3>
        <el-input type="text" v-model="newTag" @keyup.enter.native="addTag()"></el-input>
        <el-button @click.stop="addTag()">添加</el-button>
        <ul class="tag-list">
            <li class="list-item" v-for="(item, index) in tagArr" :key="item._id">
                <i class="icon-tag"></i>
                <input class="tag-input" type="text" :value="item.name" v-model="item.name" @keyup.enter.stop="editTag(item, index)">
                <i class="icon-delete" @click.stop="delTag(item, index)"></i>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Tag',
    data() {
        return {
            tag: '',
            tagArr: [],
            newTag: '',
            thisTag: ''
        }
    },
    created() {
        this.$store.dispatch('getAllTags').then(res => {
            this.tagArr.push(...res.data);
        })
    },
    methods: {
        addTag(){

        },
        editTag(item, index) {
            let value = {
                val: item.name,
                id: item._id
            }
            this.$store.dispatch('editTag', value).then(res => {
                if(res.code === 200){
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: `已将原标签 ${res.oldData.name} 修改为 ${res.data.name} `
                    })
                }
            })
        },
        delTag(item, index) {
            this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('delTag', item._id).then(res => {
                    this.tagArr.splice(index, 1);
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '已删除标签：' + item.name
                    });
                });
            }).catch(() => {
                this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
.tag {
    margin: 0 20px;
    .el-input{
        max-width: 152px;
    }
    .tag-list {
        min-height: 56px;
        display: flex;
        flex-wrap: wrap;
        .list-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;
            margin-left: 0;
            padding: 10px;
            font-size: 16px;
            border: 1px dashed transparent;
            position: relative;
            &:hover{
                border: 1px dashed #888;
            }
            .tag-input {
                appearance: none;
                border: none;
                outline: none;
                padding: 10px 10px;
                width: 80px;
                font-size: 16px;
                font-weight: 400;
                font-family: Consolas, Courier New, Courier, monospace
            }
            .icon-tag {
                display: inline-block;
                height: 25px;
                width: 25px;
                background: url('../../assets/img/tag.png') no-repeat;
                background-size: 100% 100%;
            }
            .icon-delete {
                display: inline-block;
                height: 25px;
                width: 25px;
                background: url('../../assets/img/delete.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
        }
    }
}
</style>