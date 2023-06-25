
export function validateURL(url: string): boolean {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return urlPattern.test(url);
  }