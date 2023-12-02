// validationSchema.js
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  landmark: Yup.string().required('Landmark is required'),
  village: Yup.string().required('Village is required'),
  district: Yup.string().required('District is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string()
    .matches(/^\d{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  houseNo: Yup.string().required('House No is required'),
});

export default validationSchema;
