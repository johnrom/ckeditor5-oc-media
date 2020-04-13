/* global $, mediaApp */
/**
 * @module ckeditor5-oc-media/ckeditor5-oc-media
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export class InsertImage extends Plugin {
	init() {
		const editor = this.editor;
		const editorTextarea = $( editor.sourceElement );
		const fieldWrapper = editorTextarea.closest( '.ckeditor-field' );
		const modal = $( '#mediaModalHtmlField' );

		editor.ui.componentFactory.add( 'insertImage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert Orchard Image',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				mediaApp.selectedMedias = [];

				const mediaAppElement = $( '#mediaApp' );
				const modalBody = modal.find( '.modal-body' );

				mediaAppElement.appendTo( modalBody ).show();
				modal.appendTo( fieldWrapper );

				modal.modal();
			} );

			return view;
		} );

		fieldWrapper.on( 'click', '#mediaHtmlFieldSelectButton', function() {
			for ( let i = 0; i < mediaApp.selectedMedias.length; i++ ) {
				editor.model.change( writer => {
					// todo, dynamically map real URL
					const imageElement = writer.createElement( 'image', {
						src: '/Media/' + mediaApp.selectedMedias[ i ].mediaPath
					} );

					// Insert the image in the current selection location.
					editor.model.insertContent(
						imageElement,
						editor.model.document.selection
					);
				} );
			}
			modal.modal( 'hide' );
			return true;
		} );
	}
}
