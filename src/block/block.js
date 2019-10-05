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
import 'prismjs/plugins/keep-markup/prism-keep-markup.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import { languages } from '../utils/languages';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, PlainText, InspectorControls, ColorPalette, BlockControls } = wp.editor;
const { PanelBody, SelectControl, Button, ToggleControl, SandBox } = wp.components;

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
registerBlockType( 'cgb/block-eom-svg-code-snippets', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'SVG Code Snippets' ), // Block title.
	icon: 'media-code', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting,
	keywords: [
		__( 'eom-svg-code-snippets' ),
		__( 'eom-svg-code-snippets' ),
		__( 'eom-svg-code-snippets' ),
		__( 'EOM' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		content: {
			type: 'string',
			source: 'attribute',
			selector: 'pre',
			attribute: 'content',
		},
		formattedContent: {
			type: 'string',
			source: 'text',
			selector: 'pre',
		},
		lineNumbers: {
			type: 'boolean',
			default: false,
		},
		codeFontColor: {
			type: 'string',
		},
		codeBackgroundColor: {
			type: 'string',
		},
		codeLanguage: {
			type: 'string',
			default: 'javascript',
		},
		isPreview: {
			type: 'boolean',
			default: false,
		},
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
	edit: ( props ) => {
		const { attributes: { content, codeBackgroundColor, codeFontColor, formattedContent, lineNumbers, codeLanguage, isPreview }, setAttributes, className } = props;
		const onChangeContent = ( newContent ) => {
			setAttributes( { content: newContent } );
		};

		function onCodeFontColorChange( newColor ) {
			setAttributes( { codeFontColor: newColor } );
		}

		function onCodeBackgroundColorChange( newColor ) {
			setAttributes( { codeBackgroundColor: newColor } );
		}

		function onCodeLanguageChange( newLanguage ) {
			setAttributes( { codeLanguage: newLanguage } );
		}

		function formatCode() {
			const html = Prism.highlight( content, Prism.languages[codeLanguage], codeLanguage );
			const htmlString = `<pre class="language-${ codeLanguage }" style="color: red; "><code>${ html }</code></pre>`;
			setAttributes( { formattedContent: htmlString } );
			setAttributes( { isPreview: true } );
		}

		function toggleLineNumbers() {
			setAttributes( { lineNumbers: ! lineNumbers } );
		}

		function switchToPreview() {
			setAttributes( { isPreview: true } );
		}

		function switchToHTML() {
			setAttributes( { isPreview: false } );
		}

		return (
			<div>
				<BlockControls>
					<div className="components-toolbar">
						<button
							className={ `components-tab-button ${ ! isPreview ? 'is-active' : '' }` }
							onClick={ switchToHTML }
						>
							<span>HTML</span>
						</button>
						<button
							className={ `components-tab-button ${ isPreview ? 'is-active' : '' }` }
							onClick={ switchToPreview }
						>
							<span>{ __( 'Preview' ) }</span>
						</button>
					</div>
				</BlockControls>
				<InspectorControls style={ { marginBottom: '40px' } }>
					<PanelBody title={ 'Code Background Color' }>
						<p>Select a background color:</p>
						<ColorPalette value={ codeBackgroundColor } onChange={ onCodeBackgroundColorChange }/>
						<p>Select a font color:</p>
						<ColorPalette value={ codeFontColor } onChange={ onCodeFontColorChange }/>

					</PanelBody>
					<PanelBody title={ 'Language' }>
						<SelectControl
							multiple={ false }
							label={ __( 'Select a language:' ) }
							value={ codeLanguage } // e.g: value = [ 'a', 'c' ]
							onChange={ onCodeLanguageChange }
							options={ languages }
						/>
						<Button isDefault onClick={ formatCode }>
							Format Code
						</Button>
					</PanelBody>
					<PanelBody title={ lineNumbers ? 'Hiding Line Numbers' : 'Showing Line Numbers' }>
						<ToggleControl
							label={ __( 'Show/Hide Line Numbers', 'eom-svg-code-snippets' ) }
							checked={ ! lineNumbers }
							onChange={ toggleLineNumbers }
						/>
					</PanelBody>
				</InspectorControls>

				{
					( isPreview ) ? (
						<SandBox className={ `${ className } language-${ codeLanguage }` } html={ formattedContent }/>
					) : (
						<PlainText
							value={ content }
							onChange={ onChangeContent }
							placeholder={ __( 'Write HTML…' ) }
							aria-label={ __( 'HTML' ) }
							className={ 'plain-text' }
						/>
					) }

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
	save: ( props ) => {
		let cls = ( props.attributes.codeLanguage ) ? 'language-' + props.attributes.codeLanguage : '';
		cls = ( props.attributes.className ) ? cls + props.attributes.className : cls;
		cls = ( ! props.attributes.lineNumbers ) ? cls + ' line-numbers' : cls;
		return (
			<pre className={ cls } content={ props.attributes.content }>{ props.attributes.formattedContent }</pre> );
	},
} );
