import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import InviteUserEmail from '@/emails/invite-user';

const resend = new Resend(process.env.RESEND_API_KEY!);

const send = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST': {
      console.log('Invite user email');
      try {
        const { to, username, projectName, invitedByUsername, projectId, role } = await req.body;
        console.log('Invite user email', to, username, projectName, invitedByUsername, projectId, role);
        const { data, error } = await resend.emails.send({
          from: 'Buns <buns@dedevs.club>',
          to,
          subject: 'Invitation to join a project',
            react: InviteUserEmail({
            username,
            projectName,
            invitedByUsername,
            inviteLink: `${req.headers.origin}/invites/${projectId}?role=${role}`,
          }),
        });

        if (error) {
          return res.status(400).json({ error });
        }

        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default send;