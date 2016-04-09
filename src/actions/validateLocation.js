export default () => {
  const {host, pathname} = window.location;

  const hostCheck = host === 'mypage.apple.com';
  const pathCheck = pathname.match(/\/mypage\/(myTime|kronosSchedule)\.action/);

  if (!hostCheck && !pathCheck) {
    throw new URIError('Not on MyPage Schedule');
  }
};
