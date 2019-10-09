/**
 * BLOCK: eom-svg-code-snippets
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss'
import './style.scss'
// Import from NPM
import Prism from 'prismjs'
import { languages } from '../utils/languages'
// Import components
import Toolbar from './components/Toolbar'

const { __ } = wp.i18n // Import __() from wp.i18n
const { registerBlockType } = wp.blocks // Import registerBlockType() from wp.blocks
const { PlainText, InspectorControls, ColorPalette, BlockControls } = wp.editor
const { PanelBody, SelectControl, Button, ToggleControl } = wp.components
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
		operatingSystem: {
			type: 'string',
			default: 'macos',
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
		const { attributes: { content, codeBackgroundColor, operatingSystem, formattedContent, codeLanguage, isPreview }, setAttributes, className } = props
		let cls = ( codeLanguage ) ? `language-${ codeLanguage } ` : ''
		cls = ( className ) ? cls + className : cls
		const onChangeContent = ( newContent ) => {
			setAttributes( { content: newContent } )
		}

		function onCodeBackgroundColorChange( newColor ) {
			setAttributes( { codeBackgroundColor: newColor } )
		}

		function onCodeLanguageChange( newLanguage ) {
			setAttributes( { codeLanguage: newLanguage } )
			formatCode()
		}

		function onOperatingSystemChange( newOperatingSystem ) {
			setAttributes( { operatingSystem: newOperatingSystem } )
		}

		function formatCode() {
			const html = Prism.highlight( content, Prism.languages[codeLanguage], codeLanguage )
			setAttributes( { formattedContent: html } )
			setAttributes( { isPreview: true } )
		}

		function switchToPreview() {
			setAttributes( { isPreview: true } )
		}

		function switchToHTML() {
			setAttributes( { isPreview: false } )
		}

		function getOS() {
			const platform = window.navigator.platform,
				macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ],
				windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ]

			if (macosPlatforms.indexOf( platform ) !== -1) {
				setAttributes( { operatingSystem: 'macos' } )
			} else if (windowsPlatforms.indexOf( platform ) !== -1) {
				setAttributes( { operatingSystem: 'windows10' } )
			} else {
				setAttributes( { operatingSystem: 'macos' } )
			}
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
					<PanelBody title={ 'Toolbar' }>
						<SelectControl
							multiple={ false }
							label={ __( 'Select an OS Toolbar:' ) }
							value={ operatingSystem }
							onChange={ onOperatingSystemChange }
							options={ [
								{ value: 'none', label: 'No toolbar' },
								{ value: 'macos', label: 'MacOS' },
								{ value: 'windows10', label: 'Windows 10' } ] }
						/>
					</PanelBody>
				</InspectorControls>

				{
					( isPreview ) ? (
						<div className="snippet-container">
							<div className={ `window-container--${ operatingSystem }` }>
								<Toolbar operatingSystem={ operatingSystem } />
								<pre className={ `${ cls }` } dangerouslySetInnerHTML={ { __html: formattedContent } }
										 style={ { background: codeBackgroundColor } } />
							</div>
						</div>
					) : (
						<PlainText
							value={ content }
							onChange={ onChangeContent }
							placeholder={ __( 'Write HTML…' ) }
							aria-label={ __( 'HTML' ) }
							className={ 'plain-text' }
							style={ { fontFamily: 'monospace' } }
						/>
					) }

			</div>
		)
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
		const { attributes: { content, operatingSystem, formattedContent, codeLanguage, codeBackgroundColor }, className } = props
		let cls = ( codeLanguage ) ? 'language-' + codeLanguage : ''
		cls = ( className ) ? cls + className : cls
		return (
			<div className="snippet-container">
				<div className={ `window-container--${ operatingSystem }` }>
					<Toolbar operatingSystem={ operatingSystem }/>
					<pre className={ cls } content={ content }
							 style={ { background: codeBackgroundColor } }>{ formattedContent }</pre>
				</div>
			</div>
		)
	},
} )

