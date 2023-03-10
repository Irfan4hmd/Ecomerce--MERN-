import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Alert,Modal,Form,Button } from 'react-bootstrap'
import Product from './Product'
const UpdProduct = ({key,product}) => {
    const [images, setImages] = useState("");
    const [cimages, setCimages] = useState([]);
    const [cimagesprev, setCimagesprev] = useState([]);
    const [products, setProducts] = useState({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      seller: product.seller,
      stock: product.stock,
    });
    const { user } = useSelector((state) => state.auth);
    const onchange = (e) => {
        if (e.target.name === "productImage") {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImages(reader.result);
              console.log(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setProducts({ ...product, [e.target.name]: e.target.value });
        }
      };
    const newChange=(e)=>{
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          cimages.push(reader.result);
          cimagesprev.push(reader.result);
          setCimages(cimages);
          setCimagesprev(cimagesprev)
          console.log(cimages);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    
    }
    const { name, price, description, category, seller, stock } = products;
    
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        let CarouselImages=cimages
        const productData = {
          name,
          price,
          description,
          category,
          images,
          CarouselImages,
          seller,
          stock,
          user,
        };
       
  
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.put(
          `api/v1/product/${product._id}`,
          productData,
          config
        );
        
        if(data.success){
            window.location.reload();
        }
        
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
   




         // https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg
        <div key={key} className="col-sm-12 col-md-6 col-lg-3 my-3">
          
          <div >
            <span style={{marginLeft:"250px",cursor:"pointer"}}>
          <i className='fas fa-edit' onClick={handleShow} ></i>
         

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        method="post"
      >
        <Modal.Body>
       
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onchange}
            id="exampleFormControlInput1"
            style={{ width: "540px" }}
            placeholder="Enter Product Name"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Seller Name
          </label>
          <input
            type="text"
            className="form-control"
            name="seller"
            value={seller}
            onChange={onchange}
            id="exampleFormControlInput1"
            style={{ width: "540px" }}
            placeholder="Enter Seller Name"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            style={{ width: "540px" }}
            placeholder="Enter Category Name"
            name="category"
            value={category}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ width: "780px" }}
            placeholder="Enter Product Description"
            name="description"
            value={description}
            onChange={onchange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="Price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={price}
            onChange={onchange}
            placeholder="Enter Product Price"
            style={{ width: "440px" }}
            id="price"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={stock}
            onChange={onchange}
            placeholder="Enter total Stock available"
            style={{ width: "440px" }}
            id="Stock"
          />
        </div>
        
        <label htmlFor="productImage_upload">Product Image:</label>
        <div className="custom-file">
          <label className="custom-file-label" htmlFor="customFile">
            Choose Image: 
          </label>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            name="productImage"
            accept="images/*"
            onChange={onchange}
          />
        </div>
      <div>
      <label htmlFor="CarouselImage_upload">Carousel Images:</label>
        <div className="custom-file">
          <label className="custom-file-label" htmlFor="customFile">
            Choose Images: 
          </label>
          <div className='d-flex align-items-center'>
        
            {
              
              cimages&&cimagesprev.map((image)=>(
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={image}
                              className='rounded-circle'
                              alt='Avatar Preview'
                          />
                      </figure>
                  </div>
                 ))
              
                }
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            name="productImage"
            accept="images/*"
            onChange={newChange}
          />
        </div>
   
        </div>

  </div>
     
      
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
          </span>
      <Product product={product} />
          </div>
        </div>
        
    )
}

export default UpdProduct