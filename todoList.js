let todoList=new Vue({
    el: '#todoList',
    data: {
        thing:'',
        things:[],//id content done
        button: 'all',
        i:0,
        dis: 'hidden',
    },
    methods:{
        addThing(){
            if(this.thing.trim().length!==0){
                this.i++;
                this.things.push( {'id':this.i, 'content':this.thing, 'done':0});
                this.thing='';
            }
        },
        deletThing(id1){
            this.things=this.things.filter((el,index1,arr)=>{return el.id!==id1});
            let temp=this.things.filter(function(el,index1,arr){return el.done===1});
            if(temp.length!==0){
                this.dis='visible';
            } else{
                this.dis='hidden';
            }   
        },
        stateChange(item1){
            if(item1.done===0){
                let index1=this.things.indexOf(item1);
                let id1=item1.id;
                let content1=item1.content;
                Vue.set(this.things,index1,{'id':id1,'content':content1,'done':1});
            }else if(item1.done===1){
                let index1=this.things.indexOf(item1);
                let id1=item1.id;
                let content1=item1.content;
                Vue.set(this.things,index1,{'id':id1,'content':content1,'done':0});
            }
            let temp=this.things.filter(function(el,index1,arr){return  el.done===1});
            if(temp.length!==0){
                this.dis='visible';
            } else{
                this.dis='hidden';
            }
        },
        clearDone(){
            this.things=this.things.filter(function(el){return el.done!==1});
            let temp=this.things.filter(function(el,index1,arr){return el.done===1});
            if(temp.length!==0){
                this.dis='visible';
            } else{
                this.dis='hidden';
            }
        },
        showWhat(buttonType){
            if(buttonType==='all'){
                this.button='all';
            }else if(buttonType==='complete'){
                this.button='complete';
            }else if(buttonType==='uncomplete'){
                this.button='uncomplete';
            }
        },
        changeThing(item1,event1){
            let index=this.things.indexOf(item1);
            let event2=event1.slice(0,event1.length);
            console.log(index);
            if(event2.length===0){
                this.things.splice(index,1);
            }else{
                Vue.set(this.things,index,{'id':item1.id,'content':event2,'done':item1.done});
            }
            // console.log(1);
            // console.log(event1.length);
            console.log(event1);
        },
        
    },
    computed:{
        //根据不同的选项按钮，展示的不同的数据
        showThings: function(){
            if(this.button==='all'){
                return this.things;
            }else if(this.button==='uncomplete'){
                let temp=this.things.filter( (el,index1,arr)=>{return el.done===0})
                return temp;
            }else if(this.button==='complete'){
                let temp=this.things.filter( (el,index1,arr)=>{return el.done===1})
                return temp;
            }
        },
    }
    
})
Vue.component('items-component',{
    props: ['item','classt','state'],
    data: 
        function(){
            return {
                content1: '',
                editable: false,
                focusState: false,
            }
        },
    methods: {
        blurInput(){
            this.$refs.content1.blur();
            this.editable=false;
        },

        blur(){
            this.$emit(`input`, this.$refs.content1.innerText);
            this.editable=false;
        },
        changeEdit(){
            this.editable=true;
            this.$nextTick(()=>{this.$refs.content1.focus();});//nextTick()避免 元素还没有渲染完成进行focus操作会出错！！！
            //this.focusState = true;
            
        },

    },
    directives: {
        focus: {
            update: function (el, {value}) {
                if (value) {
                el.focus()
                }
            },
        },
    },
    template: '<div id="container"> <input id="check" type="checkbox" :checked="state" v-on:change="$emit(`state-change`)"/>  \
                    <span   id="item" >\
                    <div :contenteditable="editable" v-focus="focusState" @dblclick="changeEdit()" id="itemin" :class="classt" ref="content1" @keydown.enter.prevent="blurInput()"  @blur="blur()" >{{ item }}</div> \
                    <button id="del" contenteditable=false v-on:click="$emit(`del-thing`)">&#10007;</button>\
                    </span>  \
               </div>'
})