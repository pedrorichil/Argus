export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === null || bytes === undefined || isNaN(bytes)) return '0 Bytes';
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatBps = (bps, decimals = 2) => {
  if (bps === null || bps === undefined || isNaN(bps) || bps < 0) {
    return '0 Kbps';
  }
  if (bps === 0) return '0 Kbps';

  const k = 1000; 
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bps', 'Kbps', 'Mbps', 'Gbps'];
  const i = Math.floor(Math.log(bps) / Math.log(k));

  if (i >= sizes.length || i < 0) return '0 Kbps';

  return parseFloat((bps / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};