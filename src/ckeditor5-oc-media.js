/**
 * @module ckeditor5-oc-media/ckeditor5-oc-media
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export class InsertImage extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert image',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
				$("#mediaApp").detach().appendTo('#mediaModalHtmlField .modal-body');
				$("#mediaApp").show();
				mediaApp.selectedMedias = [];
				var modal = $('#mediaModalHtmlField').modal();

				$('#mediaHtmlFieldSelectButton').on('click', function (v) {
					for (i = 0; i < mediaApp.selectedMedias.length; i++) {
						editor.model.change( writer => {
							const imageElement = writer.createElement( 'image', {
								src: mediaApp.selectedMedias[i].mediaPath
							} );

							// Insert the image in the current selection location.
							editor.model.insertContent( imageElement, editor.model.document.selection );
						} );
					}
					$(document).trigger('contentpreview:render');
					$('#mediaModalHtmlField').modal('hide');
					return true;
				});
            } );

            return view;
        } );
    }
}
