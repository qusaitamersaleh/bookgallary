import App from './app.mjs';


const port = process.env.PORT || 5000;
App.listen(port, () => console.log(`  Server running on port ${port}`));
