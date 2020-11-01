<template>
  <div class="container">
    <div class="container">

    <!-- Category Modal Start-->
    <div class="modal fade" id="categoryModalCenter" tabindex="-1" role="dialog" aria-labelledby="categoryModalCenterTitle" aria-hidden="true" ref="vuemodal">
      <div class="modal-dialog modal-dialog-centered" role="document">

        <form @submit.prevent="saveCategory" class="w-100">

          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ categoryModalTitle }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              
                  <div class="form-group">
                      <label for="categoryTitle">Category Title *</label>
                      <input type="text" class="form-control" placeholder="Enter Category Title" v-model="categoryTitle" required>
                  </div>
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click.prevent="saveCategory">Save changes</button>
            </div>
          </div>

        </form>

      </div>
    </div>
    <!-- Category Modal End-->
    

    <div class="card mt-5">
      <div class="card-header">
        <div class="d-flex w-100">
          <h3>List of Category</h3>
          <button
            type="button" 
            class="btn btn-primary ml-auto"
            @click="addCategory"
          >
          Add New Category
          </button>
        </div>
      </div>

      <div class="card-body">
        <table class="table">
          <thead class="table-active">
            <tr>
              <th scope="col">Category Title</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, n) in categoryList" :key="n">
              <td>{{ category }}</td>
              <td>
                <button class="btn btn-info btn-sm mr-2" @click="editCat(n)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="removeCat(n)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      categoryList: [],
      editeditem: -1,
      showEditItem: false,
      categoryModalTitle: 'Add Category',
      categoryTitle: '',
      editedItem: null
    }
  },
  name: 'Post',
  methods: {
    showModal() {
      $("#categoryModalCenter").modal('show');
    },

    addCategory() {
      this.categoryTitle = '';
      this.categoryModalTitle = 'Add Category';
      this.editeditem = -1;
      this.showModal();
    },

    saveCategory() {

      if(!this.categoryTitle) {
        return;
      }

      // Update an Item
      if(this.showEditItem) {
        this.categoryList[this.editeditem] = this.categoryTitle;
      }
      else {
        this.categoryList.push(this.categoryTitle);
      }


      this.categoryTitle = '';
      this.saveInLocalStorage();
      $("#categoryModalCenter").modal('hide'); 
      
    },

    removeCat(n) {
      this.categoryList.splice(n, 1);
      this.saveInLocalStorage();
    },

    saveInLocalStorage() {
      const parsedCategory = JSON.stringify(this.categoryList);
      localStorage.setItem('categories', parsedCategory);
    },

    editCat(n) {
      this.categoryModalTitle = 'Edit Category';
      this.showEditItem = true;
      this.editeditem = n;
      this.categoryTitle = this.categoryList[n];
      this.showModal();
    },

    getCategory() {
      if(localStorage.getItem('categories')) {
        try {
          this.categoryList = JSON.parse(localStorage.getItem('categories'));
        } catch(e) {
          localStorage.removeItem('categories');
        }
      }
    }
  },
  mounted() {
    this.getCategory();
  }
}
</script>
