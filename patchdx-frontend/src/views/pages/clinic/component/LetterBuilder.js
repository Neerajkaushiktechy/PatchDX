import Underline from '@tiptap/extension-underline'
import { IoIosArrowBack } from "react-icons/io";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  FaBold,
  FaItalic,
  FaParagraph,
  FaStrikethrough,
  FaHeading,
  FaListOl, FaListUl,
  FaRedo,
  FaUndo,
  FaUnderline
} from "react-icons/fa";
import { ConfirmationModel, Loader } from '../../../../components'
import { submitLetterTemplate, getSingleLetterTemplate } from "../../../../service/letterTemplate/letterTemplate";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="control-group">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FaStrikethrough />Strike
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <FaParagraph />Paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <FaHeading />H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <FaHeading />H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <FaHeading />H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <FaHeading />H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        <FaHeading />H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        <FaHeading />H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FaListOl />Bullet list
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FaListUl />Ordered list
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaRedo />Undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaUndo /> Redo
      </button>
    </div>
  );
}

const content = `
 <div class="item">
  <p><b>To</b></p>
  <p>{name}</p>
  <p>{phone number}</p>
  <p>{address}</p>
  </div>
  <br/>
  <div>
  <p><b>From</b></p>
  <p>{name}</p>
  <p>{phone number}</p>
  <p>{address}</p>
  <br/>
  </div>
  <p>Patch testing indicates that you have skin allergies! These allergens are like encountered in { } and { }.</p>
  <p>You reacted to the following:</p>
`
const TiptapEditor = ({ field, form }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: field.value,
    onUpdate: ({ editor }) => {
      form.setFieldValue(field.name, editor.getHTML());
    },
  });

  return <>
    <MenuBar editor={editor} />
    <EditorContent editor={editor} />
  </>
};

const formContent = {
  templateName: '',
  content: '',
}

const LetterBuilder = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [letterId, setLetterId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

  const [editContent, setEditContent] = useState({
    templateName: '',
    content: '',
  })

  useEffect(() => {
    if (id !== '' && id) {
      setLoading(true);
      getSingleLetterTemplate(atob(id))
        .then((res) => {
          if (res.status === 200) {
            setLetterId(res.data._id)
            setEditContent({
              templateName: res.data.templateName,
              content: res.data.template[0]
            })
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleHTML = (values) => {
    const templateForm = {
      id: letterId,
      templateName: values.templateName,
      templateJson: values.content,
    };
    submitLetterTemplate(templateForm).then((res) => {
      if (res.status === 200) {
        setMessage(res?.data?.message);
        setOpenModal(true)
      }
    })
  }

  const handleOk = () => {
    setOpenModal(false)
    navigate('/clinic/letter-builder-list');
  }


  const handleBack = (e) => {
    e.preventDefault();
    navigate('/clinic/letter-builder-list');
  }

  return (
    <>
      {loading && <Loader />}
      <div className="px-[30px]">
        <div className="mb-5 sm:mb-[30px] block sm:flex items-center justify-between">
          <div onClick={handleBack} className="flex items-center">
            <IoIosArrowBack className="text-xl md:text-[26px] mr-[10px] md:mr-[14px]" />
            <h1 className="main-title text-base sm:text-lg">Letter Builder</h1>
          </div>
        </div>
        <ConfirmationModel openModal={openModal} message={message} setOpenModal={setOpenModal} handleOk={handleOk} />
        <div className="shadow-full p-6 rounded-[10px]">
          <Formik
            enableReinitialize={true}
            initialValues={editContent}
            onSubmit={(values) => {
              handleHTML(values);
            }}
          >
            {({ values }) => (
              <Form>
                {/* Field for Tiptap Editor */}
                <div className="mb-5">
                  <Field className='form-control w-full' type='text' name='templateName' placeholder='Enter template name' />
                </div>

                {(values.content === editContent.content) && <Field name="content" component={TiptapEditor} />}
                {(values.content !== editContent.content) && <Field name="content" component={TiptapEditor} />}
                <div class="text-end mt-3"><button type='submit' className="btn-theme">{id !== '' && id ? 'Update Template' : 'Add Template'}</button></div>
              </Form>
            )}
          </Formik>
        </div>
      </div >
    </>
  )

}

export default LetterBuilder;