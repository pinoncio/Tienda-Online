import {Router} from 'express';
import multer from 'multer';
import { deleteProducto, getProducto,getProductos,newProducto, updateProducto, updateStock, updateImagen } from '../controllers/producto';
import path from 'path';

const router = Router();
const storage = multer.diskStorage({
    destination: 'public/',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const fileName = `${Date.now()}${ext}`;
      cb(null, fileName);
    }
  });

  const upload = multer({storage: storage});

router.post('/', upload.single('imagen'), newProducto);
router.patch('/:cod_producto/updateImagen', upload.single('imagen'), updateImagen);
router.get('/list',getProductos);
router.get('/:cod_producto',getProducto);
router.delete('/:cod_producto',deleteProducto);
router.put('/:cod_producto',upload.single('imagen'),updateProducto);
router.patch('/stock',updateStock);


export default router;