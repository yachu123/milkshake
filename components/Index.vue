<template>
  <div class="index container">
    <div class="card" v-for=" recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleterecipe(recipe.id)">delete</i>
        <h2 class="indigo-text">{{recipe.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ing,index) in recipe.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
        <div class="edit-btn">
          <span class="btn-floating btn-large blue accent-1">
            <router-link :to="{name:'Editer' , params:{milkshake_slug: recipe.slug}}">
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Index',
  data () {
    return {
      recipes:[]
    }
  },
  methods:{
    deleterecipe(id){
      db.collection('milkshake').doc(id).delete()
      .then(()=>{
        this.recipes = this.recipes.filter(recipe =>{
          return recipe.id != id
        })
      })
    }
  },
  created(){
    //fetch data from firebase
    db.collection('milkshake').get()
    .then(snapshot =>{
      snapshot.forEach(doc => {
        let milkshake = doc.data()
        milkshake.id = doc.id
        this.recipes.push(milkshake)
      });
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top:40px;
}
.index h2{
  font-size: 1.5em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto ;
}
.index .ingredients li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top:4px;
  right:4px;
  cursor:pointer;
  color:#aaa;
  font-size: 1.4em;
}
.index .edit-btn{
  position: absolute;
  right:6px;
  bottom: 6px;
  cursor:pointer;
  
}
</style>
