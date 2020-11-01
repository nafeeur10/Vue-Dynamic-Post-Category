<template>
  <div class="container">

    <!-- Post Modal Start Here -->

    <div class="modal fade" id="postModalCenter" tabindex="-1" role="dialog" aria-labelledby="postModalCenterTitle" aria-hidden="true" ref="vuemodal">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">

         <form @submit.prevent="savePostData" class="w-100">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postModalCenterTitle">{{ postModalTitle }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           
                <div class="form-group">
                    <label for="postTitle">Post Title *</label>
                    <input type="text" class="form-control" placeholder="Enter Post Title" v-model="postForm.postTitle" required>
                </div>
                <div class="form-group">
                    <label for="postDescription">Post Description *</label>
                    <textarea class="form-control" rows="3" v-model="postForm.postDescription" required></textarea>
                </div>
                <div class="form-group">
                  <label for="postCategory">Post Category *</label>
                  <div>

                    <multi-select-wrapper 
                      v-model="postForm.postCategory" 
                      :options="categoryOptions"
                      :multiple="true"
                      :close-on-select="true"
                      @input="onInput" 
                    />

                  </div>
                </div>
                
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="savePostData">Save changes</button>
          </div>
        </div>
         </form>
      </div>
    </div>

    <!-- Post Modal End Here -->


    <!-- Category Modal Start Here -->

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
    <!-- Category Modal End Here -->

    <div class="card mt-5">
      <div class="card-header">
        <div class="d-flex w-100">
          <h3>List of Post</h3>
          <button
            type="button" 
            class="btn btn-primary ml-auto"
            @click="addNewPost"
          >
          Add New Post
          </button>
        </div>
      </div>

      <div class="card-body">
        <table class="table">
          <thead class="table-active">
            <tr>
              <th scope="col">Post Title</th>
              <th scope="col">Post Description</th>
              <th scope="col">Post Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, n) in postList" :key="n">
              <td>{{ post.postTitle }}</td>
              <td>{{ post.postDescription }}</td>
              <td>
                <span class="badge badge-primary mr-2" v-for="(category, m) in post.postCategory" :key="m">{{ post.postCategory[m] }}</span>
              </td>
              <td>
                <button class="btn btn-info btn-sm mr-2" @click="editPost(n)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="removePost(n)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
import $ from 'jquery'
import MultiSelectWrapper from '../components/MultiSelectWrapper'
export default {
  data() {
    return {
      postList: [],
      categoryModalTitle: 'Add Category',
      postModalTitle: 'Add Post',
      value: null,
      postData: [],
      postForm: {
          postTitle: '',
          postDescription: '',
          postCategory: ''
      },
      model: null,
      extraData: null,
      categoryOptions: [],
      showEditItem: false,
      editeditem: null,
      categoryTitle: '',
      categoryList: []
    }
  },
  name: 'Post',
  components: {
    MultiSelectWrapper
  },
  methods: {

    showModal() {
      $("#postModalCenter").modal('show');
    },
    hideModal() {
      $("#postModalCenter").modal('hide');
    },
    showCategoryModal() {
      $("#categoryModalCenter").modal('show');
    },
    hideCategoryModal() {
      $("#categoryModalCenter").modal('hide');
    },

    addNewPost() {
      this.postForm = {};
      this.showEditItem = false;
      this.showModal();
    },
    savePostData() {
      if(this.showEditItem) {
        this.postList[this.editeditem] = this.postForm;
      }
      else {
        this.postList.push(this.postForm);
      }
      const parsedPost = JSON.stringify(this.postList);
      localStorage.setItem('posts', parsedPost);
      this.hideModal();
    },
    getCategories() {
      if(localStorage.getItem('categories')) {
        try {
          let localStorageCategories = [];
          localStorageCategories = JSON.parse(localStorage.getItem('categories'));
          
          for(let i = 0; i<localStorageCategories.length; i++) {
            this.categoryOptions.push(localStorageCategories[i]);
          }

          this.categoryList = JSON.parse(localStorage.getItem('categories'));
        } catch(e) {
          localStorage.removeItem('categories');
        }
      }
    },

    editPost(n) {
      this.postModalTitle = 'Edit Post';
      this.showEditItem = true;
      this.editeditem = n;
      this.postForm = this.postList[n];
      this.showModal();
    },
    removePost(n) {
      this.postList.splice(n, 1);
      this.saveInLocalStorage();
    },
    saveInLocalStorage() {
      const parsedPost = JSON.stringify(this.postList);
      localStorage.setItem('posts', parsedPost);
    },
    getPost() {
      if(localStorage.getItem('posts')) {
        try {
          this.postList = JSON.parse(localStorage.getItem('posts'));
        } catch(e) {
          localStorage.removeItem('posts');
        }
      }
    },
    onInput(data) {
      let dataLength = Object.keys(data).length
      if(data[dataLength-1] === 'Add New Category') {
        this.postForm.postCategory.pop();
        this.showCategoryModal();
      }
      else
      {
        this.extraData = data;
      }
    },
    addCategory() {
      this.categoryModalTitle = 'Add Category';
      this.editeditem = -1;
    },
    saveCategory() {

      if(!this.categoryTitle) {
        return;
      }
      this.categoryList.push(this.categoryTitle);
      this.categoryOptions.push(this.categoryTitle);
     
      this.categoryTitle = '';
      this.saveCategoryInLocalStorage();
      $("#categoryModalCenter").modal('hide'); 
      
    },
    saveCategoryInLocalStorage() {
      const parsedCategory = JSON.stringify(this.categoryList);
      localStorage.setItem('categories', parsedCategory);
    },
  },
  mounted() {
    this.categoryOptions.push('Add New Category');
    this.getCategories();
    this.getPost();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
