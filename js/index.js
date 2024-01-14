const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
    
}

const displayData = (data, dataLimit) =>{
    // console.log(data);
    const cardContent = document.getElementById('card-content');
    cardContent.textContent = '';

   

    const seeMoreBtn = document.getElementById('btn-see-more');
    if(dataLimit === false  && data.length > 6){
      data = data.slice(0, 6);
      seeMoreBtn.classList.remove('d-none');
    }
    else{
      seeMoreBtn.classList.add('d-none');
    }

    data.forEach( dataEliment => {


       const createDiv = document.createElement('div');
       createDiv.classList.add('col', 'rounded-3');

       createDiv.innerHTML = `
       <div class="card h-100 p-3">
        <img src="${dataEliment.image ? dataEliment.image : 'Image Not Found' }" class="card-img-top rounded-3 h-50" alt="Image Not Found">
        <div class="mt-2">
          <h5 class="card-title">Features</h5>
          <div class="d-flex flex-column">
            <small><span>1. ${dataEliment.features[0]}</span></small>            
            <small><span>2. ${dataEliment.features[1]}</span></small>            
            <small><span>3. ${dataEliment.features[2]}</span></small>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center border-top mt-3 pt-3">
          <div>
                <h5>${dataEliment.name}</h5>
                <small><span><i class="fa-regular fa-calendar-days"></i> </span> <span>${dataEliment.published_in}</span></small>
          </div>
          <div>
            <i onclick="nextButton(${dataEliment.id})" class="fa-solid fa-circle-arrow-right fs-3 text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
          </div>
        </div>
      </div>

       `;
        
       cardContent.appendChild(createDiv);
       toggleLoader(false);
    });

   
}

const nextButton = async(id) => {

  let newId = id.toString();  
  if(newId=== '1' || newId=== '2' || newId==='3' || newId==='4' || newId==='5' || newId==='6'|| newId==='7' || newId==='8' || newId==='9'){
   newId = '0'+newId;
  }

  const url = `https://openapi.programming-hero.com/api/ai/tool/${newId}`;
  // console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayModalContent(data.data);


  // console.log(data.data);
   

}

const displayModalContent = (data) =>{

  // console.log(data);
  
  const modalCardContent = document.getElementById('modal-card-body');
  modalCardContent.innerHTML = `
  <div class="row p-2 p-md-5">
                <!-- start  -->
                <div class="col-md mb-3 my-sm-0">
                  <div class="card h-100 border-danger bg-danger-subtle">
                    <div class="card-body d-flex flex-column ">
                      <div>
                        <h6 class="card-title">${data.description}</h6>
                      </div>


                      <div class="">
                        
                          <!-- price content  -->
                        

                            <div class="d-flex justify-content-between column-gap-3 my-3">
                              <div class="px-2 py-4 fw-semibold lh-1 text-center bg-white rounded-3 text-success">$10/ month
                            Basic</div>
                              <div class="px-2 py-4 fw-semibold lh-1 text-center bg-white rounded-3 text-warning">$50/ month
                                Pro</div>
                              <div class="px-2 py-4 fw-semibold lh-1 text-center align-self-center bg-white rounded-3 text-danger">Contact <br> us <br> Enterprise</div>
                            </div>
  
                      
                        <!-- end  -->
                        <div class="d-flex justify-content-evenly align-items-center gap-1">
                          <!-- feature Content  -->
                          <div class="">
                            <h5>Feature</h5>
                            <small>
                              <li><small class="fw-light">${data.features[1].feature_name}</small></li>
                              <li><small class="fw-light">${data.features[2].feature_name}</small></li>
                              <li><small class="fw-light">${data.features[3].feature_name}</small></li>
                            </small>
                          </div>
                          <div class="">
                            <h5>Integrations</h5>
                            <div class="d-flex flex-column">
                            <small>
                             <li><small class="fw-light">${data.integrations[0]}</small></li>
                             <li><small class="fw-light">${data.integrations[1]}</small></li>
                             <li><small class="fw-light">${data.integrations[2]}</small></li>
                             </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Price and Feature Content  -->
                 </div>
                </div>
                <div class="col-md">
                  <div class="card h-100">
                    <div class="card-body">
                      <img src="${data.image_link[0]}" class="w-100 rounded-3" alt="">
                    </div>
                      <div class="text-center my-3">

                        <h5 class="  card-title">Hi, how are you doing today?</h5>
                        
                        <small class="card-text">I'm doing well, thank you for asking. How can I assist you today?</small>
                      </div>
                  
                  </div>
                </div>


                <!-- end  -->
              </div>
  
  `
;
};




const toggleLoader = (isLoading) =>{
  const loader = document.getElementById('loader');
  if(isLoading){
    loader.classList.remove('d-none')
  }
  else{
    loader.classList.add('d-none');
  }
}

document.getElementById('btn-see-more').addEventListener('click', function(){
  loadData(true);
  toggleLoader(true);
})



toggleLoader(true);
loadData(false);
