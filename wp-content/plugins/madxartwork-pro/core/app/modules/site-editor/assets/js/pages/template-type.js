import { TemplateTypesContext } from '@madxartwork/site-editor';
import { AddNewButton, Grid, Heading, NotFound } from '@madxartwork/app-ui';
import SiteTemplates from '../organisms/site-templates';
import useFeatureLock from 'madxartwork-pro-app/hooks/use-feature-lock';

import './template-type.scss';

export default function TemplateType( props ) {
	const { templateTypes } = React.useContext( TemplateTypesContext ),
		currentType = templateTypes.find( ( item ) => item.type === props.type ),
		{ isLocked, ConnectButton } = useFeatureLock( 'site-editor' );

	if ( ! currentType ) {
		return <NotFound />;
	}

	return (
		<section className={ `e-site-editor__templates e-site-editor__templates--type-${ props.type }` }>
			<Grid className="page-header" container justify="space-between">
				<Heading variant="h1">{ currentType.page_title }</Heading>
				{
					isLocked
						? <ConnectButton />
						: <AddNewButton url={ currentType.urls.create } text={ __( 'Add New', 'madxartwork-pro' ) } />
				}
			</Grid>
			<hr className="eps-separator" />
			<SiteTemplates type={ currentType.type } id={ props.id } />
		</section>
	);
}

TemplateType.propTypes = {
	type: PropTypes.string,
	page_title: PropTypes.string,
	id: PropTypes.string,
};
