const API_URL = 'httplocalhost:1337';

async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`)
}
