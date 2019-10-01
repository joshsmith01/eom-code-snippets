/**
 * BLOCK: eom-svg-code-snippets
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
// Import from NPM
import Prism from 'prismjs';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RichText, PlainText, InspectorControls, ColorPalette} = wp.editor;
const {PanelBody, SelectControl, Button} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-eom-svg-code-snippets', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('SVG Code Snippets'), // Block title.
	icon: 'media-code', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting,
	keywords: [
		__('eom-svg-code-snippets'),
		__('eom-svg-code-snippets'),
		__('eom-svg-code-snippets'),
		__('EOM'),
		__('create-guten-block'),
	],
	attributes: {
		content: {
			type: 'string',
			source: 'text',
			selector: 'pre',
		},
		formattedContent: {
			type: 'string',
			source: 'text',
		},
		codeFontColor: {
			type: 'string',
		},
		codeBackgroundColor: {
			type: 'string',
		},
		codeLanguage: {
			type: 'string',
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const {attributes: {content, codeBackgroundColor, codeFontColor, formattedContent, codeLanguage}, setAttributes, className} = props;
		const onChangeContent = (newContent) => {
			let inner = document.querySelector('pre').innerText;
			setAttributes({content: inner});
			// setAttributes(prevState => {
			// 	console.log(prevState);
			// 	return { ...prevState.content, ...newContent }
			// });
		};

		function onCodeFontColorChange(newColor) {
			setAttributes({codeFontColor: newColor})
		}

		function onCodeBackgroundColorChange(newColor) {
			setAttributes({codeBackgroundColor: newColor})
		}

		function onCodeLanguageChange(newLanguage) {
			setAttributes({codeLanguage: newLanguage});
		}


		function formatCode() {
			console.log('props: ', props);
			console.log('content: ', content);
			const code = content.toString();
			const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

			setAttributes({content: content});
			setAttributes({formattedContent: html});
			console.log('code: ', code);
			console.log('html: ', html);
			console.log('content: ', content);
		}

		return (
			<div>
				<InspectorControls style={{marginBottom: '40px'}}>
					<PanelBody title={'Code Background Color'}>
						<p>Select a background color:</p>
						<ColorPalette value={codeBackgroundColor}
									  onChange={onCodeBackgroundColorChange}/>
						<p>Select a font color:</p>
						<ColorPalette value={codeFontColor}
									  onChange={onCodeFontColorChange}/>

					</PanelBody>
					<PanelBody title={'Language'}>
						<SelectControl
							multiple={false}
							label={__('Select a language:')}
							value={codeLanguage} // e.g: value = [ 'a', 'c' ]
							onChange={onCodeLanguageChange}
							options={[
								{value: null, label: 'Select a Language', disabled: true},
								{value: 'a', label: 'Language A'},
								{value: 'b', label: 'Language B'},
								{value: 'c', label: 'Language C'},
							]}
						/>
						<Button isDefault onClick={formatCode}>
							Format Code
						</Button>
					</PanelBody>
				</InspectorControls>

				<RichText
					tagName="pre"
					className={`${className} language-javascript`}
					onChange={onChangeContent}
					value={formattedContent}
					style={{backgroundColor: codeBackgroundColor}}
				/>

			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		console.log('save props: ', props);

		return (<pre
			className={`${props.attributes.className} language-javascript`}>{props.attributes.formattedContent}</pre>);
	},
});
