<template>
    <div class="app">
        <input @keyup.enter="addNewItem" v-model="newItem" type="text"/>
        <ul>
            <li v-for="item in items" :key="item.id" v-bind:class={finished:item.isFinished} v-on:click="finish(item)">
                {{item.label}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newItem: '',
            items: [
                {
                    id: 1,
                    label: "read book",
                    isFinished: false
                },
                {
                    id: 2,
                    label: "eat dinner",
                    isFinished: true
                }
            ]
        }
    },
    methods: {
        addNewItem(){
            let id = this.items.length + 1;
            this.items.push({
                id,
                label: this.newItem,
                isFinished: false
            });
            this.newItem = '';
        },
        finish(item){
            item.isFinished = !item.isFinished;
        }
    }
}
</script>
<style>
.finished{
    text-decoration: line-through;
}
</style>
