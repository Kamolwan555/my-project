function Calculate() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Embed a Website</h1>
            <iframe
                src="https://osd101.ldd.go.th/search_fertilizer.php"
                width="100%"
                height="700px"
                style={{ border: 'none' }}
                title="Embedded Website"
            ></iframe>
        </div>
    );
}

export default Calculate;
