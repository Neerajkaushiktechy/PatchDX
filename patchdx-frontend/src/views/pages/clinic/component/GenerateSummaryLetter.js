import Mention from '@tiptap/extension-mention'
import { EditorContent, useEditor, ReactRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Extension } from '@tiptap/core';
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style';
import React, { useState, useEffect, useRef } from 'react'
import { Formik, Field, Form, FieldArray } from 'formik';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoIosArrowBack } from "react-icons/io";
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
import { fetchReactedAllergens } from "../../../../service/patch/patch";
import { fetchLetterTemplate, submitSummaryLetter, getSingleLetterTemplate, getSingleSummaryLetter } from "../../../../service/letterTemplate/letterTemplate";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleFontChange = (font) => {
    if (editor) {
      debugger
      const mentionText = 'John Doe'; // Example mention text
      editor.chain().focus().setMark('textStyle', { fontFamily: font }).run();
    }
  };

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
      <FontStyleDropdown onChange={handleFontChange} />
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

const FontStyleDropdown = ({ onChange }) => {
  const fontStyles = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];

  return (
    <select onChange={(e) => onChange(e.target.value)} defaultValue="Arial">
      <option value="" disabled>
        Select Font
      </option>
      {fontStyles.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};

const CustomMention = Mention.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      renderLabel({ options, node }) {
        // Only render the mention label (name) without the "@" symbol
        return `${node.attrs.label}`;
      },
    };
  },
  addAttributes() {
    debugger
    return {
      fontFamily: {
        default: 'Arial',
        parseHTML: element => element.style.fontFamily || null,
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) return {};
          return { style: `font-family: ${attributes.fontFamily}` };
        },
      },
      label: {
        default: null,
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, HTMLAttributes.label || ''];
  },
  addCommands() {
    return {
      setMention: () => ({ chain }) => {
        return chain().insertContent({
          type: 'mention',
          attrs: { fontFamily: 'Arial' }, // Default font family
        });
      },
    };
  },
});

const FontFamily = Extension.create({
  name: 'fontFamily',
  addCommands() {
    return {
      setFontFamily: (font) => ({ commands }) => {
        return commands.setMark('textStyle', { fontFamily: font });
      },
    };
  },
});

const FontSize = Extension.create({
  name: 'fontSize',
  addCommands() {
    return {
      setFontSize: (size) => ({ commands }) => {
        return commands.setMark('textStyle', { fontSize: size });
      },
    };
  },
});

const TiptapEditor = ({ field, form, setEditorContent }) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeItems, setActiveItems] = useState(false);
  const [triggerText, setTriggerText] = useState('');
  let [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      CustomMention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
      }),
    ],
    content: field.value,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
      form.setFieldValue(field.name, editor.getHTML());
    }
  });

  const fetchAllergenList = async () => {
    setLoading(true);
    const response = await fetchReactedAllergens().then((res) => {
      if (res?.data?.success) {
        return res?.data.reactedAllergens[0]?.patchTests;
      }
    });
    return response;  // Assuming the API returns an array of allergens
  };

  const updateEditorContent = async () => {
    const currentContent = editor.getHTML();  // Get the current content of the editor
    if (currentContent.includes('@allergenlist@')) {  // Check for the placeholder
      const allergenList = await fetchAllergenList();
      const updatedContent = currentContent.replace('@allergenlist@', allergenList?.map(item => `<p>${item.title}</p>`).join(''));  // Replace placeholder
      editor.commands.setContent(updatedContent);  // Update editor content
      setEditorContent(updatedContent);
      form.setFieldValue(field.name, updatedContent);
      setLoading(false);
    } else {
      setEditorContent(currentContent);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editor) {
      updateEditorContent();
    }
  }, [editor]);



  // const handleKeyDown = useCallback(
  //   (event) => {
  //     if (event.key === 'Enter' && editor && triggerText.startsWith('@')) {
  //       // Check if there are any active items to insert
  //       const query = triggerText.slice(1);
  //       if (activeItems.length > 0) {
  //         event.preventDefault();
  //         const { from, to } = editor.state.selection;
  //         for (let index = 0; index < activeItems.length; index++) {
  //           editor.commands.insertContent({
  //             type: 'paragraph',
  //             attrs: {
  //               class: 'mention-paragraph',
  //             },
  //             content: [{
  //               type: 'mention',
  //               attrs: {
  //                 id: activeItems[index]._id,
  //                 label: activeItems[index].displayName,
  //               },
  //             }],
  //           });
  //         }
  //         const mentionTriggerLength = query.length + 3; // Add 1 for '@'
  //         const triggerStart = from - mentionTriggerLength;

  //         // Delete the typed text (e.g. "@username")
  //         editor.commands.deleteRange({
  //           from: triggerStart,
  //           to: from,
  //         });
  //         setActiveItems([]);
  //         setTriggerText('');
  //         editor.view.focus();
  //       }
  //     }
  //   },
  //   [editor, activeItems]
  // );

  return <>
    {loading && <Loader />}
    <MenuBar editor={editor} />
    <EditorContent editor={editor} />
  </>
};

const GenerateSummaryLetter = () => {
  const location = useLocation();
  const contentRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  let [showRichTextBox, setShowRichTextBox] = useState(false);
  let [templateList, setTemplateList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

  const [editContent, setEditContent] = useState({
    templateId: '',
    selectedOption: '',
    templateName: '',
    content: '',
  })

  useEffect(() => {
    setLoading(true);
    fetchLetterTemplate(atob(id))
      .then((res) => {
        if (res.status === 200) {
          setTemplateList(res.data)
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    getSingleSummaryLetter(atob(id))
      .then((res) => {
        if (res.status === 200) {
          setEditContent({
            selectedOption: res.data[0].templateId,
            templateId: res.data[0].templateId,
            content: res.data[0].summaryLetter,
            patientId: atob(id),
          });
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleHTML = (values) => {
    const templateForm = {
      templateId: values.selectedOption,
      patientId: atob(id),
      letter: values.content,
    };
    submitSummaryLetter(templateForm).then((res) => {
      if (res.status === 200) {
        setMessage(res?.data?.message);
        setOpenModal(true)
      }
    })
  }

  const handleLetterTemplate = (id) => {
    setShowRichTextBox(false)
    getSingleLetterTemplate(id).then((res) => {
      if (res.status === 200) {
        setEditContent({
          selectedOption: id,
          templateName: res.data.templateName,
          content: res.data.template[0],
        })

      }
    })
    setShowRichTextBox(true)
  }

  const handleDownloadPdf = () => {
    const content = `
    <div style="padding: 50px; font-size:36px;">
      ${editorContent === '' ? editContent.content : editorContent}
    </div>
  `;

    const hiddenDiv = document.createElement('div');
    hiddenDiv.innerHTML = content;
    document.body.appendChild(hiddenDiv);

    html2canvas(hiddenDiv, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('SummaryLetter.pdf');
        document.body.removeChild(hiddenDiv);
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };

  const handlePrint = (e) => {
    e.preventDefault();
    const printContent = `
    <div style="padding: 50px; font-size:36px;">
    ${editorContent === '' ? editContent.content : editorContent}
    </div>
  `;
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = originalContents;
      setTimeout(() => {
        window.print();
      }, 100);
      document.body.innerHTML = originalContents;
    }
  }

  const handleOk = () => {
    setOpenModal(false)
    navigate('/clinic/summary-letter');
  }

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/clinic/summary-letter');
  }

  return (
    <>
      {loading && <Loader />}
      <div className="px-[30px]">
        <div className="block sm:flex justify-between items-center mb-[30px]">
          <div onClick={handleBack} className="flex items-center">
            <IoIosArrowBack className="text-xl md:text-[26px] mr-[10px] md:mr-[14px]" />
            <h1 className="main-title text-base sm:text-lg">Generate Summary Letter</h1>
          </div>
          <div className="block sm:flex items-center">
            <div className="relative mt-2 sm:mt-0 mb-2 sm:mb-0">
              <button type='submit' onClick={handleDownloadPdf} className="btn-theme">Download PDF</button>
            </div>
            <button type='button' onClick={(e) => handlePrint(e)} className="btn-theme ml-2">Print</button>
          </div>
        </div>

        {/* <div className="mb-5 sm:mb-[30px] block sm:flex items-center justify-between">
          <div className="flex items-center">
            <button type='submit' onClick={handleDownloadPdf} className="btn-theme">Download PDF</button>
          </div>
          <div className="flex items-center">
            <button type='button' onClick={(e) => handlePrint(e)} className="btn-theme">Print</button>
          </div>
        </div> */}
        <ConfirmationModel openModal={openModal} message={message} setOpenModal={setOpenModal} handleOk={handleOk} />
        <Formik
          enableReinitialize={true}
          initialValues={editContent}
          onSubmit={(values) => {
            handleHTML(values)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <>
                <div className="shadow-full p-6 rounded-[10px]">

                  <div className="flex gap-7">
                    {templateList?.map((item, i) => (
                      <div key={i} className="flex items-center ps-4 border border-gray-200 rounded w-full mb-5">
                        <Field name="selectedOption" value={String(item._id)} onChange={(e) => { e.preventDefault(); handleLetterTemplate(item._id); setFieldValue('selectedOption', item._id) }} id={i} type="radio" class="w-4 h-4 text-blue-600 border-gray-300" />
                        <label for="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">{item.templateName}</label>
                      </div>
                    ))}
                  </div>
                  {(values.content === editContent.content) &&
                    <Field name="content" setEditorContent={setEditorContent} component={TiptapEditor} />
                  }
                  {(values.content !== editContent.content) &&
                    <Field name="content" setEditorContent={setEditorContent} component={TiptapEditor} />
                  }
                  <div class="text-end mt-3"><button type='submit' className="btn-theme">Save Letter</button></div>

                  {/* <div className="w-full relative">
                                    <div className="flex items-center ps-4 border border-gray-200 rounded w-full">
                                        <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" class="w-4 h-4 text-blue-600 border-gray-300" />
                                        <label for="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Clinically relevant</label>
                                    </div>
                                    <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg absolute top-[60px]">
                                        <li class="w-fullrounded-t-lg">
                                            <div class="flex ps-4 py-3">
                                                <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1" />
                                                <label for="vue-checkbox" class="w-full ms-2 text-sm font-medium text-gray-900">Allergens are found in personal care products</label>
                                            </div>
                                        </li>
                                        <li class="w-fullrounded-t-lg">
                                            <div class="flex ps-4 py-3">
                                                <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1" />
                                                <label for="react-checkbox" class="w-full ms-2 text-sm font-medium text-gray-900">Allergens are found in an occupational setting</label>
                                            </div>
                                        </li>
                                        <li class="w-fullrounded-t-lg">
                                            <div class="flex ps-4 py-3">
                                                <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1" />
                                                <label for="angular-checkbox" class="w-full ms-2 text-sm font-medium text-gray-900">Allergens are found in a healthcare setting</label>
                                            </div>
                                        </li>
                                        <li class="w-fullrounded-t-lg">
                                            <div class="flex ps-4 py-3">
                                                <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1" />
                                                <label for="laravel-checkbox" class="w-full ms-2 text-sm font-medium text-gray-900">Allergens are found in other setting</label>
                                            </div>
                                        </li>
                                    </ul>

                                </div> */}

                </div>
              </>
            </Form>
          )}
        </Formik>
      </div >
    </>
  )

}

export default GenerateSummaryLetter;