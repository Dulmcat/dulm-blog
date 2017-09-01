<template>
    <div class="tag">
        <h3>标签</h3>
        <el-input id="tag" type="text" v-model="tag" placeholder="请输入标签" @keyup.enter.native="addTag()"></el-input>
        <el-button type="primary" @click.stop="addTag()">点击添加</el-button>
        <ul class="tag-list">
            <li class="list-item" v-for="(item, index) in tagArr" :key="item._id">
                <el-tooltip content="点击修改" placement="bottom" effect="light">
                    <el-button icon="edit" @click="editTag(item, index)">{{item.name}}</el-button>
                </el-tooltip>
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
        }
    },
    mounted() {
        this.$store.dispatch('getAllTags').then(res => {
            this.tagArr.push(...res.data);
        })
    },
    methods: {
        editTag(item, index) {
            this.$prompt('请修改标签', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: item.name
            }).then(({value}) => {
                this.tagArr[index].name = value;
                this.$message({
                    type: 'success',
                    message: '已经修改为' + value
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                })
            })
        }
    }

}
</script>

<style scoped lang="less">
.tag {
    margin: 0 20px;
    .el-input {
        max-width: 200px;
    }
    .el-button {
        margin: 0;
    }
}

.tag-list {
    min-height: 56px;
    display: flex;
    flex-wrap: wrap;
    .list-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        margin-left: 0;
        font-size: 16px;
    }
}

.btn {
    margin-bottom: 20px;
}
</style>