import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  bookName: Yup.string().required('ورود نام کتاب الزامی است.'),
  bookAuthor: Yup.string().required('ورود نام نویسنده کتاب الزامی است.'),
  bookPublisher: Yup.string().required('ورود نام ناشر کتاب الزامی است.'),
  bookAbstract: Yup.string().required('ورود خلاصه ای از کتاب الزامی است.'),
  bookCover: Yup.string()
    .url('آدرس معتبر نیست!')
    .required('ورود آدرس تصویر جلد کتاب الزامی است.'),
});
