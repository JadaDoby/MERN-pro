import { useParams, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
  useDeleteProductMutation
} from "../slices/productsApiSlice";



const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      };

      const result = await updateProduct(updatedProduct);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Product updated successfully');
        navigate('/admin/productlist');
      }
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const imageData = await uploadProductImage({ productId, image });
    if (imageData.error) {
      toast.error(imageData.error);
    } else {
      toast.success('Image uploaded successfully');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              {/* Existing form fields */}
              {/* ... */}
              <Button type="submit" variant="primary" className='my-2'>
                Update Product
              </Button>
            </Form>
            <Form onSubmit={handleImageUpload}>
              <Form.Group controlId='image' className='my-2'>
                <Form.Label> Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL for upload"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <Form.Control type='file' label='Choose file' onChange={uploadFileHandler} />
              </Form.Group>
              <Button type="submit" variant="info">
                Upload Image
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
