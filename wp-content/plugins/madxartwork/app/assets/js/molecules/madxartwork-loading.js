export default function madxartworkLoading( props ) {
	return (
		<div className="madxartwork-loading">
			<div className="madxartwork-loader-wrapper">
				<div className="madxartwork-loader">
					<div className="madxartwork-loader-boxes">
						<div className="madxartwork-loader-box" />
						<div className="madxartwork-loader-box" />
						<div className="madxartwork-loader-box" />
						<div className="madxartwork-loader-box" />
					</div>
				</div>
				<div className="madxartwork-loading-title">{ props.loadingText }</div>
			</div>
		</div>
	);
}

madxartworkLoading.propTypes = {
	loadingText: PropTypes.string,
};

madxartworkLoading.defaultProps = {
	loadingText: __( 'Loading', 'madxartwork' ),
};
